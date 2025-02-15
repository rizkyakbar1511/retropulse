"use client";

import Image from "next/image";
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { useRouter } from "next/navigation";
import type { Category, Game } from "@prisma/client";
import {
	ArchiveBoxIcon,
	ChevronDownIcon,
	PhotoIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import type { AxiosProgressEvent } from "axios";
import { createGameSchema, updateGameSchema } from "@/lib/zod";
import { deleteGameBySlug, upsertGame } from "@/actions/game";
import { cn } from "@/lib/utils";
import { uploadToS3 } from "@/lib/upload";
import Spinner from "@/components/spinner";
import ProgressBar from "@/components/progress-bar";
import Radio from "@/components/radio";
import { deleteS3File } from "@/lib/s3";
import SpinnerDots from "@/components/spinner-dots";
import ConfirmDialog from "@/components/confirm-dialog";

interface GameFormProps {
	categories: Category[];
	game?: (Game & { categories: Category[] }) | null;
}

export default function GameForm({ categories, game }: GameFormProps) {
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
	const [gameFilePreview, setGameFilePreview] = useState<File | null>(null);
	const [upload, setUpload] = useState({
		name: "",
		isUploading: false,
		progress: 0,
	});
	const formRef = useRef<HTMLFormElement | null>(null);
	const router = useRouter();

	const {
		register,
		setValue,
		handleSubmit,
		clearErrors,
		trigger,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<
		z.infer<typeof updateGameSchema> | z.infer<typeof createGameSchema>
	>({
		resolver: zodResolver(game?.id ? updateGameSchema : createGameSchema),
		defaultValues: {
			id: game?.id || null,
			title: game?.title || "",
			slug: game?.slug || "",
			description: game?.description || "",
			categoryId: game?.categories[0].id.toString() || "",
			status: game?.published ? "true" : "false",
			featured: game?.featured ? "true" : "false",
		},
	});

	const handleFileChange = <T,>(
		event: React.ChangeEvent<HTMLInputElement>,
		name: "thumbnail" | "gameFile",
		cb: Dispatch<SetStateAction<T | null>>,
	) => {
		try {
			const file = event.target.files?.[0];
			if (file) {
				const objectUrl = name === "thumbnail" && URL.createObjectURL(file);
				cb(name === "thumbnail" ? (objectUrl as T) : (file as T));
				if (name) setValue(name, file, { shouldValidate: true });
			}
		} catch (error) {
			console.log("🚀 ~ onFileChange ~ error:", error);
		}
	};

	const handleRemoveFile = <T,>(
		name: "thumbnail" | "gameFile",
		cb: Dispatch<SetStateAction<T | null>>,
	) => {
		cb(null);
		if (name) setValue(name, "" as unknown as File);
		trigger(name);
	};

	const onProgressUpload = (
		progressEvent: AxiosProgressEvent,
		name: string,
	) => {
		const { loaded, total } = progressEvent;
		const percent = total ? Math.floor((loaded * 100) / total) : 0;

		// Update progress percentage (e.g., show in UI)
		setUpload((prev) => ({ ...prev, name, progress: percent }));

		// Handle edge case where total is 0
		if (total === 0) {
			console.info("Total size unknown. Progress unavailable.");
		}
	};

	const processGameSubmission = async () => {
		if (!formRef.current) return;
		const formData = new FormData(formRef.current);
		const gameThumbnail = formData.get("thumbnail") as File;
		const gameFile = formData.get("gameFile") as File;

		if (gameThumbnail.size > 0 || gameFile.size > 0)
			setUpload((prev) => ({ ...prev, isUploading: true }));

		try {
			//NOTE: this conditional statement is check whether the game props exists which means in update mode and the file provided then delete old files on S3

			if (game && gameThumbnail.size > 0)
				await deleteS3File(game.image.split("/").at(-1) as string);
			if (game && gameFile.size > 0)
				await deleteS3File(game.game_url.split("/").at(-1) as string);

			const [thumbnail, ROM] = await Promise.all([
				...(gameThumbnail.size > 0
					? [
							await uploadToS3(
								gameThumbnail,
								`thumbnails/${gameThumbnail.name}`,
								(progressEvent) => onProgressUpload(progressEvent, "thumbnail"),
							),
						]
					: []),
				...(gameFile.size > 0
					? [
							await uploadToS3(
								gameFile,
								`ROMs/${gameFile.name}`,
								(progressEvent) => onProgressUpload(progressEvent, "ROM"),
							),
						]
					: []),
			]);

			formData.set(
				"thumbnail",
				thumbnail
					? `https://varied-white-haddock.myfilebase.com/ipfs/${thumbnail.headers["x-amz-meta-cid"]}`
					: "",
			);

			formData.set(
				"gameFile",
				ROM
					? `https://varied-white-haddock.myfilebase.com/ipfs/${ROM.headers["x-amz-meta-cid"]}`
					: "",
			);

			await upsertGame(formData);
			router.replace("/dashboard");
		} catch (error) {
			console.log("🚀 ~ handleFormSubmit ~ error:", error);
			setError("slug", {
				message: (error as Error).message,
			});
		} finally {
			setUpload((prev) => ({ ...prev, isUploading: false }));
		}
	};

	useEffect(() => {
		return () => {
			if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
		};
	}, [thumbnailPreview]);

	return (
		<>
			<form
				ref={formRef}
				onSubmit={handleSubmit(processGameSubmission)}
				className="grid grid-cols-8 gap-4"
			>
				<input {...register("id")} type="hidden" />
				<div className="relative space-y-4 col-span-full">
					<AnimatePresence>
						{upload.isUploading && upload.name && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ duration: 0.3 }}
								className="p-8 space-y-3 border border-yellow-400 rounded-md bg-main"
							>
								<h6 className="font-display">Please wait...</h6>
								<div className="flex items-center gap-4">
									<h6 className="font-display">Uploading {upload.name}</h6>
									<SpinnerDots />
								</div>
								<div className="flex items-center gap-2">
									<ProgressBar progress={upload.progress} />
									<p>{upload.progress}%</p>
								</div>
							</motion.div>
						)}
						{Object.entries(errors).length > 0 && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ duration: 0.3 }}
								className="flex gap-5 p-8 bg-red-100 rounded-md"
								layout
							>
								<XCircleIcon className="text-red-700 size-9" />
								<div className="space-y-4">
									<h3 className="text-red-700 font-display">
										There were {Object.entries(errors).length} errors with your
										submission
									</h3>
									<ul className="list-disc pl-9">
										{Object.entries(errors).map(([key, value]) => (
											<li className="text-red-700" key={key}>
												{value.message}
											</li>
										))}
									</ul>
								</div>
								<button
									type="button"
									className="absolute top-5 right-5"
									onClick={() => clearErrors()}
								>
									<XMarkIcon className="text-red-300 size-6" />
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className="space-y-4 col-span-full md:col-span-3 lg:col-span-2">
					<div className="space-y-2">
						<h6 className="text-xs text-slate-400">GAME THUMBNAIL</h6>
						<div className="relative group/thumbnail">
							{thumbnailPreview && (
								<Image
									className="object-cover rounded-md"
									src={thumbnailPreview}
									alt="Game Image"
									fill
								/>
							)}
							<label className="flex flex-col items-center justify-center bg-black border border-dashed rounded-md cursor-pointer hover:bg-accent-secondary h-52 border-accent">
								{!thumbnailPreview && (
									<div className="flex flex-col items-center justify-center">
										<PhotoIcon className="size-10" />
										<h6 className="text-sm">
											<b>Click to upload</b> or drag and drop
										</h6>
										<p className="text-xs">PNG, JPG, WEBP ( max. 1MB )</p>
									</div>
								)}
								<input
									name="thumbnail"
									onChange={(e) =>
										handleFileChange(e, "thumbnail", setThumbnailPreview)
									}
									type="file"
									accept="image/*"
									className="hidden"
								/>
							</label>
							<button
								type="button"
								onClick={() =>
									handleRemoveFile("thumbnail", setThumbnailPreview)
								}
								className={cn(
									"opacity-0 pointer-events-none transition-opacity absolute bg-accent-secondary cursor-pointer inset-0 flex flex-col items-center justify-center gap-2",
									thumbnailPreview &&
										"group-hover/thumbnail:opacity-100 group-hover/thumbnail:pointer-events-auto",
								)}
							>
								<TrashIcon className="size-8" />
								<h6 className="text-sm text-center">remove thumbnail</h6>
							</button>
						</div>
					</div>
					<div className="space-y-2">
						<h6 className="text-xs text-slate-400">ROMs</h6>
						<div className="relative group/game-file">
							<label className="flex flex-col items-center justify-center bg-black border border-dashed rounded-md cursor-pointer h-52 border-accent hover:bg-accent-secondary">
								<ArchiveBoxIcon className="size-10" />
								{gameFilePreview ? (
									<h6 className="text-sm">{gameFilePreview.name}</h6>
								) : (
									<>
										<h6 className="text-sm">
											<b>Click to upload</b> or drag and drop
										</h6>
										<p className="text-xs">ZIP, RAR, 7z</p>
									</>
								)}
								<input
									name="gameFile"
									onChange={(e) =>
										handleFileChange(e, "gameFile", setGameFilePreview)
									}
									type="file"
									accept=".zip,.rar,.7z"
									className="hidden"
								/>
							</label>
							<button
								type="button"
								onClick={() => handleRemoveFile("gameFile", setGameFilePreview)}
								className={cn(
									"opacity-0 pointer-events-none transition-opacity absolute bg-accent-secondary cursor-pointer inset-0 flex flex-col items-center justify-center gap-2",
									gameFilePreview &&
										"group-hover/game-file:opacity-100 group-hover/game-file:pointer-events-auto",
								)}
							>
								<TrashIcon className="size-8" />
								<h6 className="text-sm text-center">
									remove &quot;{gameFilePreview?.name}&quot;
								</h6>
							</button>
						</div>
					</div>
				</div>
				<div className="space-y-5 col-span-full md:col-span-5 lg:col-span-6">
					<div className="flex flex-col gap-1">
						<label className="text-xs text-slate-400" htmlFor="title">
							TITLE
						</label>
						<input
							{...register("title")}
							id="title"
							className="p-2 bg-black border rounded-md border-accent"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-xs text-slate-400" htmlFor="slug">
							SLUG{" "}
						</label>
						<input
							{...register("slug")}
							id="slug"
							className="p-2 bg-black border rounded-md border-accent"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-xs text-slate-400" htmlFor="description">
							DESCRIPTION
						</label>
						<textarea
							{...register("description")}
							id="description"
							className="p-2 bg-black border rounded-md resize-none border-accent"
							rows={6}
						/>
					</div>
					<div>
						<h6 className="text-xs text-slate-400">STATUS</h6>
						<div className="flex items-center gap-3 pt-2">
							<Radio
								{...register("status")}
								id="published"
								value="true"
								label="Published"
							/>
							<Radio
								{...register("status")}
								id="private"
								value="false"
								label="Private"
							/>
						</div>
					</div>
					<div>
						<h6 className="text-xs text-slate-400">FEATURED</h6>
						<div className="flex items-center gap-3 pt-2">
							<Radio
								{...register("featured")}
								id="featured"
								value="true"
								label="Yes"
							/>
							<Radio
								{...register("featured")}
								id="not-featured"
								value="false"
								label="No"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-xs text-slate-400" htmlFor="categoryId">
							Category
						</label>
						<div className="relative focus-visible:ring-1 overflow-hidden focus-visible:ring-[#FFBA08] bg-black border border-accent rounded-md">
							<select
								id="categoryId"
								{...register("categoryId")}
								className="w-full px-3 py-2 appearance-none focus-visible:outline-none bg-inherit"
							>
								<option value="">Please select a category</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.title}
									</option>
								))}
							</select>
							<ChevronDownIcon className="absolute -translate-y-1/2 size-4 right-2 top-1/2" />
						</div>
					</div>
					<div className="flex gap-3">
						{game && (
							<button
								type="button"
								className="w-full px-6 py-2 text-sm uppercase bg-red-500 border hover:opacity-80 border-red-600 rounded-md"
								disabled={isSubmitting || upload.isUploading}
								// onClick={() => deleteGameBySlug(game.slug)}
								onClick={() => setIsConfirmDialogOpen(true)}
							>
								Delete
							</button>
						)}
						<button
							type="submit"
							className="w-full px-6 py-2 text-sm uppercase border border-yellow-400 rounded-md hover:opacity-80 bg-accent-gradient"
							disabled={isSubmitting || upload.isUploading}
						>
							{isSubmitting || upload.isUploading ? (
								<Spinner className="block mx-auto size-5" />
							) : game ? (
								"update"
							) : (
								"save"
							)}
						</button>
					</div>
				</div>
			</form>
			<ConfirmDialog
				isOpen={isConfirmDialogOpen}
				title="Delete Game"
				description="Are you sure you want to delete this game?"
				onCloseDialog={() => setIsConfirmDialogOpen(false)}
				action={() => deleteGameBySlug(game?.slug ?? "")}
			/>
		</>
	);
}
