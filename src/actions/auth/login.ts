"use server";

import { signIn } from "@/auth";
import { isAdmin } from "@/lib/utils";
import type { signInSchema } from "@/lib/zod";
import { getUserByEmail } from "@/services/user-service";
import { redirect } from "next/navigation";
import type { z } from "zod";

export async function loginAction(data: z.infer<typeof signInSchema>) {
  const { email, password } = data;
  let redirectUrl = "/";

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    const { role } = await getUserByEmail(email);

    if (role && isAdmin(role)) {
      redirectUrl = "/dashboard";
    }
  } catch (error) {
    switch ((error as { type: string }).type) {
      case "CredentialsSignin":
      case "CallbackRouteError":
        return { error: "Invalid credentials!" };
      default:
        return { error: "Something went wrong!" };
    }
  }

  if (redirectUrl) redirect(redirectUrl);
}
