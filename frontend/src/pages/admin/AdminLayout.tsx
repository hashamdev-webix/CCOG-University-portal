import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaSearch, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import { MdDashboard, MdPeople, MdPayment, MdSettings, MdMenuBook } from "react-icons/md";
import { BsFileEarmarkText, BsFolderFill, BsAwardFill } from "react-icons/bs";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";

const sidebarItems = [
  { label: "Dashboard", icon: MdDashboard, to: "/admin" },
  { label: "Applications", icon: BsFileEarmarkText, to: "/admin/applications", badge: "24" },
  { label: "Students", icon: MdPeople, to: "/admin/students" },
  { label: "Courses", icon: MdMenuBook, to: "/admin/courses" },
  { label: "Payments", icon: MdPayment, to: "/admin/payments" },
  { label: "Documents", icon: BsFolderFill, to: "/admin/documents" },
  { label: "Offer Letters", icon: BsAwardFill, to: "/admin/offers" },
  { label: "Settings", icon: MdSettings, to: "/admin/settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const currentPage = sidebarItems.find((i) =>
    i.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(i.to)
  )?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] xl:w-[260px] bg-admin-sidebar flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-input bg-accent flex items-center justify-center">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-base sm:text-lg text-white">CCOG Admin</span>
          </Link>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <FaChevronRight size={14} />
          </button>
        </div>

        {/* Admin Badge */}
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-xs font-semibold text-white/80 mb-1">Admin Panel</p>
          <StatusBadge variant="info">Super Admin</StatusBadge>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 sm:p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = item.to === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-input text-sm transition-all ${
                  active
                    ? "bg-accent/25 text-white font-semibold border-l-2 border-accent"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon size={17} />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-sm font-bold">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3 sm:p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-semibold truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-white/50 truncate">{user?.email || ""}</p>
          </div>
          <button onClick={handleLogout} className="text-white/50 hover:text-red-400 transition-colors shrink-0">
            <FaSignOutAlt size={15} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-14 sm:h-16 border-b border-border bg-background flex items-center px-3 sm:px-6 gap-3 shrink-0">
          <button className="lg:hidden p-2 hover:bg-surface rounded-input shrink-0" onClick={() => setSidebarOpen(true)}>
            <FaBars size={18} />
          </button>
          <h1 className="font-bold text-foreground text-sm sm:text-base truncate">{currentPage}</h1>
          <div className="flex-1 max-w-xs sm:max-w-md ml-auto">
            <div className="relative">
              <FaSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <button className="relative p-2 hover:bg-surface rounded-input shrink-0">
            <FaBell size={16} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
