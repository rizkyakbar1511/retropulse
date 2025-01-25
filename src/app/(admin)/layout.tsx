import AdminHeader from "@/components/admin/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AdminHeader />
      {children}
    </main>
  );
}
