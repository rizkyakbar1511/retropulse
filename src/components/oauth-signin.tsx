import { signIn } from "@/auth";
import Image from "next/image";
import type { BuiltInProviderType } from "@auth/core/providers";
import { cn } from "@/lib/utils";

interface OAuthSignInProps {
	provider: BuiltInProviderType;
	iconPath: string;
	className: string;
}

export default function OAuthSignIn({
	provider,
	iconPath,
	className,
}: OAuthSignInProps) {
	return (
		<form
			action={async () => {
				"use server";
				await signIn(provider);
			}}
		>
			<button
				type="button"
				className={cn(
					"flex items-center justify-center w-full gap-2 px-6 py-2 text-sm uppercase rounded-md hover:opacity-80",
					className,
				)}
			>
				<Image
					width={24}
					height={24}
					src={iconPath}
					alt={provider}
					priority={true}
				/>
				Sign In with github
			</button>
		</form>
	);
}
