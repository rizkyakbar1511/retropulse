import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-primary p-4 lg:p-8 rounded-tl-xl">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
}
