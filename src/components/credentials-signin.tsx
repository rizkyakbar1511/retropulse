"use client";

import { loginAction } from "@/actions/auth/login";
import Link from "next/link";
import Spinner from "@/components/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
import type { z } from "zod";

export default function CredentialsSignin() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) =>
		await loginAction(data);

	return (
		<form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-4">
				<div className="flex flex-col gap-1">
					<label className="text-xs lg:text-base" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						{...register("email")}
						className="p-2 bg-black border rounded-md border-accent"
						type="email"
					/>
					{errors.email && (
						<p className="text-xs text-red-500">{errors.email.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs lg:text-base" htmlFor="password">
						Password
					</label>
					<input
						id="password"
						{...register("password")}
						className="p-2 bg-black border rounded-md border-accent"
						type="password"
					/>
					{errors.password && (
						<p className="text-xs text-red-500">{errors.password.message}</p>
					)}
				</div>
			</div>
			<p className="text-sm font-display">
				New player?{" "}
				<Link className="text-[#FFBA08]" href="/register">
					Create your profile
				</Link>
			</p>
			<button
				type="submit"
				className="px-6 py-2 w-full text-sm uppercase border border-yellow-400 bg-accent-gradient rounded-md hover:opacity-80"
			>
				{isSubmitting ? (
					<Spinner className="size-5 block mx-auto" />
				) : (
					"Sign in"
				)}
			</button>
		</form>
	);
}
