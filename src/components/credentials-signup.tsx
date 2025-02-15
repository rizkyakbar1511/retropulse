"use client";

import { registerUser } from "@/actions/auth/register";
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import Spinner from "@/components/spinner";

export default function CredentialsSignup() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form className="space-y-7" onSubmit={handleSubmit(registerUser)}>
      <div className="space-y-4">
        <label className="flex flex-col gap-1">
          Name
          <input
            {...register("name")}
            className="p-2 bg-black border rounded-md border-accent"
            type="text"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </label>
        <label className="flex flex-col gap-1">
          Email
          <input
            {...register("email")}
            className="p-2 bg-black border rounded-md border-accent"
            type="email"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input
            {...register("password")}
            className="p-2 bg-black border rounded-md border-accent"
            type="password"
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </label>
      </div>
      <p className="text-sm font-display">
        Back for more nostalgia?{" "}
        <Link className="text-[#FFBA08]" href="/login">
          Sign in
        </Link>
      </p>
      <button type="button" className="px-6 py-3 w-full text-sm uppercase border border-yellow-400 bg-accent-gradient rounded-xl hover:opacity-80">
        {isSubmitting ? <Spinner className="size-5 block mx-auto" /> : "Sign Up"}
      </button>
    </form>
  );
}
