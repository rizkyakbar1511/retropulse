import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/zod";
import { hash } from "bcrypt-ts";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  return user;
}

export async function createUser(newCredentials: {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}) {
  const parsedCredentials = await signUpSchema.parseAsync(newCredentials);
  const user = await prisma.user.findUnique({ where: { email: parsedCredentials.email } });

  if (user) throw new Error(`User ${user.email} already exists, please login instead`);

  const hashedPasword = await hash(parsedCredentials.password, 12);
  return await prisma.user.create({
    data: {
      ...parsedCredentials,
      password: hashedPasword,
    },
  });
}
