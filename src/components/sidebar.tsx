import { getCategoryMenu } from "@/services/game-service";
import SidebarNav from "@/components/sidebar-nav";

export default async function Sidebar() {
  const categoryMenu = await getCategoryMenu();
  return (
    <aside className="w-64 p-4 hidden lg:flex flex-col">
      <SidebarNav categoryMenu={categoryMenu} />
    </aside>
  );
}
