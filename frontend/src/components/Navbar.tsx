import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Admissions", to: "/admissions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-input bg-primary flex items-center justify-center shadow-soft">
              <FaGraduationCap size={16} className="text-primary-foreground" />
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tight text-foreground">CCOG</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary ${
                  location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to))
                    ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.icon && <l.icon size={14} />}
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link to="/login" className="px-3 xl:px-4 py-2 text-sm font-semibold border border-border rounded-input text-foreground hover:bg-surface transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-3 xl:px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-input hover:opacity-90 transition-all active:scale-[0.98]">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-input hover:bg-surface transition-colors" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4 space-y-1 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-input transition-colors ${
                location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to))
                  ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-surface hover:text-foreground"
              }`}
            >
              {l.icon && <l.icon size={14} />}
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-3 border-t border-border mt-2">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-semibold border border-border rounded-input hover:bg-surface transition-colors">
              Login
            </Link>
            <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-input hover:opacity-90 transition-all">
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
