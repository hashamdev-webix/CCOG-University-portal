import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import { MdDashboard, MdPayment, MdSettings, MdVideoCall, MdUpload } from "react-icons/md";
import { BsFileEarmarkText, BsAwardFill } from "react-icons/bs";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";


const sidebarItems = [
  { label: "Dashboard", icon: MdDashboard, to: "/dashboard" },
  { label: "My Application", icon: BsFileEarmarkText, to: "/dashboard/application" },
  { label: "Documents", icon: MdUpload, to: "/dashboard/documents" },
  { label: "Payments", icon: MdPayment, to: "/dashboard/payments" },
  { label: "Offer Letter", icon: BsAwardFill, to: "/dashboard/offer" },
  { label: "Online Classes", icon: MdVideoCall, to: "/dashboard/classes" },
  { label: "Settings", icon: MdSettings, to: "/dashboard/settings" },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const currentPage = sidebarItems.find((i) =>
    i.to === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(i.to)
  )?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] xl:w-[260px] bg-background border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-input bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm">C</span>
            </div>
            <span className="font-black text-lg text-foreground">CCOG</span>
          </Link>
          <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setSidebarOpen(false)}>
            <FaChevronRight size={14} />
          </button>
        </div>

        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <span className="text-accent font-bold">{user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "S"}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user?.email || "Student"}</p>
              <StatusBadge variant="info">Student</StatusBadge>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 sm:p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = item.to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-input text-sm font-medium transition-all relative ${
                  active ? "bg-accent/10 text-accent font-semibold" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r" />}
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-input text-sm font-semibold text-destructive hover:bg-destructive/5 transition-colors w-full">
            <FaSignOutAlt size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-14 sm:h-16 border-b border-border bg-background flex items-center px-3 sm:px-6 justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden p-2 hover:bg-surface rounded-input shrink-0" onClick={() => setSidebarOpen(true)}>
              <FaBars size={18} />
            </button>
            <h1 className="font-bold text-foreground text-sm sm:text-base truncate">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="relative p-2 hover:bg-surface rounded-input">
              <FaBell size={16} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
