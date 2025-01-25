"use server";

import { signIn } from "@/auth";
import { createUser } from "@/services/user-service";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

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
