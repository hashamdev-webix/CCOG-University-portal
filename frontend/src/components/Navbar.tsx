import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const dropdowns = [
  {
    label: "Courses",
    basePath: "/courses",
    items: [
      { label: "Business Programs", to: "/courses/business" },
      { label: "Technology Programs", to: "/courses/technology" },
      { label: "Short Courses / Certifications", to: "/courses/short" },
    ],
  },
  {
    label: "Admissions",
    basePath: "/admissions",
    items: [
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Requirements", to: "/admissions/requirements" },
      { label: "Fees & Scholarships", to: "/admissions/fees-scholarships" },
    ],
  },
  {
    label: "Student Life",
    basePath: "/student-life",
    items: [
      { label: "Campus Life", to: "/student-life/campus-life" },
      { label: "Events", to: "/student-life/events" },
      { label: "Student Support", to: "/student-life/student-support" },
    ],
  },
  {
    label: "Research / Insights",
    basePath: "/research",
    items: [
      { label: "News", to: "/research/news" },
      { label: "Articles", to: "/research/articles" },
      { label: "Publications", to: "/research/publications" },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState("");
  const location = useLocation();
  const { user } = useAuth();

  const isDropdownActive = (basePath: string) =>
    location.pathname.startsWith(basePath);

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-input bg-primary flex items-center justify-center shadow-soft">
              <FaGraduationCap size={16} className="text-primary-foreground" />
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tight text-foreground">
              CCOG
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  location.pathname === l.to
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {dropdowns.map((dropdown) => (
              <div key={dropdown.label} className="relative group">
                <button
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                    isDropdownActive(dropdown.basePath)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {dropdown.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>

                <div className="absolute left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-surface"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {user ? (
              <Link
                to={user?.role === "admin" ? "/admin" : "/dashboard"}
                className="px-3 xl:px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-input hover:opacity-90 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-2 text-sm font-semibold border border-border rounded-input text-foreground hover:bg-surface transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 xl:px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-input hover:opacity-90 transition-all"
                >
                  Apply Now
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-input hover:bg-surface transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4 space-y-1 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-input text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}

          {dropdowns.map((dropdown) => (
            <div key={dropdown.label}>
              <button
                onClick={() =>
                  setMobileDropdown(
                    mobileDropdown === dropdown.label ? "" : dropdown.label
                  )
                }
                className="w-full flex items-center justify-between text-sm font-semibold py-2.5 px-3 rounded-input text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {dropdown.label}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    mobileDropdown === dropdown.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileDropdown === dropdown.label && (
                <div className="ml-3 mt-1 space-y-1">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => {
                        setOpen(false);
                        setMobileDropdown("");
                      }}
                      className="block py-2 px-3 text-sm rounded-input text-muted-foreground hover:bg-surface hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-2 pt-3 border-t border-border mt-2">
            {user ? (
              <Link
                to={user?.role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-input hover:opacity-90 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 text-sm font-semibold border border-border rounded-input hover:bg-surface transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-input hover:opacity-90 transition-all"
                >
                  Apply Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}