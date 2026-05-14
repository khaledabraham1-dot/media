import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
} from "lucide-react";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Catégories", href: "/admin/categories", icon: FolderOpen },
  { name: "Utilisateurs", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white/60 text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Retour au site
          </Link>
          <div className="font-heading text-xl font-bold">
            La Ligne<span className="text-red">.</span>Rouge
          </div>
          <div className="text-[0.7rem] text-white/40 tracking-wider uppercase mt-1">
            Administration
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {ADMIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded text-[0.85rem] text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-[0.7rem] text-white/30">
            La Ligne Rouge CMS v1.0
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-navy z-50 border-t border-white/10">
        <nav className="flex justify-around py-2">
          {ADMIN_NAV.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 p-2 text-white/60 hover:text-white"
            >
              <item.icon size={18} />
              <span className="text-[0.6rem]">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 md:pb-0 pb-16">
        {children}
      </div>
    </div>
  );
}
