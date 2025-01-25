"use server";

import { signIn } from "@/auth";
import { isAdmin } from "@/lib/utils";
import { getUserByEmail } from "@/services/user-service";
import { redirect } from "next/navigation";

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password");
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

export async function loginWithProviderAction(provider: string) {
  await signIn(provider);
}
