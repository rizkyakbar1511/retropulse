import { auth } from "@/auth";
import AdminHeader from "@/components/admin/header";
import { isAdmin } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function MainLayout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();

	if (!session?.user) redirect("/login");
	if (!isAdmin(session.user.role)) redirect("/");

	return (
		<main>
			<AdminHeader />
			{children}
		</main>
	);
}
