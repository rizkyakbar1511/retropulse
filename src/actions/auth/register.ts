"use server";

import { signIn } from "@/auth";
import type { signUpSchema } from "@/lib/zod";
import { createUser } from "@/services/user-service";
import { redirect } from "next/navigation";
import type { z } from "zod";

export async function registerUser(data: z.infer<typeof signUpSchema>) {
  const { name, email, password } = data;

  try {
    await createUser({ name, email, password });
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) return result.error;
  } catch (error) {
    return (error as Error).message;
  }

  redirect("/dashboard");
}
