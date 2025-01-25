"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Game } from "@prisma/client";
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
import { z } from "zod";
import { createGameSchema, updateGameSchema } from "@/lib/zod";
import { upsertGame } from "@/actions/game";
import { cn } from "@/lib/utils";
import { uploadToS3 } from "@/lib/upload";
import Spinner from "@/components/spinner";

interface GameFormProps {
  categories: Category[];
  game?: (Game & { categories: Category[] }) | null;
}

export default function GameForm({ categories, game }: GameFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [gameFilePreview, setGameFilePreview] = useState<File | null>(null);
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
  } = useForm<z.infer<typeof updateGameSchema> | z.infer<typeof createGameSchema>>({
    resolver: zodResolver(game?.id ? updateGameSchema : createGameSchema),
    defaultValues: {
      id: game?.id || null,
      title: game?.title || "",
      slug: game?.slug || "",
      description: game?.description || "",
      categoryId: game?.categories[0].id.toString() || "",
      status: game?.published ? "true" : "false",
    },
  });

  const handleFileChange = <T,>(
    event: React.ChangeEvent<HTMLInputElement>,
    name: "thumbnail" | "gameFile",
    cb: Dispatch<SetStateAction<T | null>>
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
    cb: Dispatch<SetStateAction<T | null>>
  ) => {
    cb(null);
    if (name) setValue(name, "" as unknown as File);
    trigger(name);
  };

  const processGameSubmission = async () => {
    const formData = new FormData(formRef.current!);
    const gameThumbnail = formData.get("thumbnail") as File;
    const gameFile = formData.get("gameFile") as File;

    try {
      const [thumbnail, ROM] = await Promise.all([
        ...(gameThumbnail.size > 0
          ? [await uploadToS3(gameThumbnail, `thumbnails/${gameThumbnail.name}`)]
          : []),
        ...(gameFile.size > 0 ? [await uploadToS3(gameFile, `ROMs/${gameFile.name}`)] : []),
      ]);

      formData.set(
        "thumbnail",
        thumbnail
          ? `https://varied-white-haddock.myfilebase.com/ipfs/${thumbnail.headers.get(
              "x-amz-meta-cid"
            )}`
          : ""
      );

      formData.set(
        "gameFile",
        ROM
          ? `https://varied-white-haddock.myfilebase.com/ipfs/${ROM.headers.get("x-amz-meta-cid")}`
          : ""
      );

      await upsertGame(formData);
      router.replace("/dashboard");
    } catch (error) {
      console.log("🚀 ~ handleFormSubmit ~ error:", error);
      setError("slug", {
        message: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [thumbnailPreview]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(processGameSubmission)}
      className="grid grid-cols-8 gap-4"
    >
      <input {...register("id")} type="hidden" />
      <div className="col-span-full space-y-4">
        <AnimatePresence>
          {Object.entries(errors).length && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-red-100 p-8 flex gap-5 rounded-md relative"
              layout
            >
              <XCircleIcon className="size-9 text-red-700" />
              <div className="space-y-4">
                <h3 className="text-red-700 font-display">
                  There were {Object.entries(errors).length} errors with your submission
                </h3>
                <ul className="pl-9 list-disc">
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
                <XMarkIcon className="size-6 text-red-300" />
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
                onChange={(e) => handleFileChange(e, "thumbnail", setThumbnailPreview)}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
            <div
              onClick={() => handleRemoveFile("thumbnail", setThumbnailPreview)}
              className={cn(
                "opacity-0 pointer-events-none transition-opacity absolute bg-accent-secondary cursor-pointer inset-0 flex flex-col items-center justify-center gap-2",
                thumbnailPreview &&
                  "group-hover/thumbnail:opacity-100 group-hover/thumbnail:pointer-events-auto"
              )}
            >
              <TrashIcon className="size-8" />
              <h6 className="text-sm text-center">remove thumbnail</h6>
            </div>
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
                onChange={(e) => handleFileChange(e, "gameFile", setGameFilePreview)}
                type="file"
                accept=".zip,.rar,.7z"
                className="hidden"
              />
            </label>
            <div
              onClick={() => handleRemoveFile("gameFile", setGameFilePreview)}
              className={cn(
                "opacity-0 pointer-events-none transition-opacity absolute bg-accent-secondary cursor-pointer inset-0 flex flex-col items-center justify-center gap-2",
                gameFilePreview &&
                  "group-hover/game-file:opacity-100 group-hover/game-file:pointer-events-auto"
              )}
            >
              <TrashIcon className="size-8" />
              <h6 className="text-sm text-center">remove &quot;{gameFilePreview?.name}&quot;</h6>
            </div>
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
          <div className="flex gap-3">
            <div className="space-x-2">
              <input
                {...register("status")}
                className="peer/status"
                id="published"
                type="radio"
                value="true"
              />
              <label className="text-sm text-slate-400" htmlFor="published">
                Published
              </label>
            </div>
            <div className="space-x-2">
              <input
                {...register("status")}
                className="peer/status"
                id="private"
                type="radio"
                value="false"
              />
              <label className="text-sm text-slate-400" htmlFor="private">
                Private
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Category</label>
          <div className="relative focus-visible:ring-1 overflow-hidden focus-visible:ring-[#FFBA08] bg-black border border-accent rounded-md">
            <select
              {...register("categoryId")}
              className="w-full px-3 py-2 appearance-none focus-visible:outline-none bg-inherit"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute -translate-y-1/2 size-4 right-2 top-1/2" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 text-sm uppercase border border-yellow-400 rounded-md bg-accent-gradient"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner className="size-5 block mx-auto" /> : game ? "update" : "save"}
        </button>
      </div>
    </form>
  );
}
