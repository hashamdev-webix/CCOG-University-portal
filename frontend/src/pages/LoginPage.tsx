import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, adminLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (role === "admin") {
        await adminLogin(email, password);
        navigate("/admin");
      } else {
        await login(email, password);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Brand */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden items-center justify-center p-8 xl:p-12">
        {/* Background: student gets image, admin gets clean dark gradient */}
        {role === "student" && (
          <div
            className="absolute inset-0 z-0 transition-all duration-500"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className={`absolute inset-0 z-0 transition-all duration-500 ${role === "admin" ? "bg-gradient-to-br from-slate-900 to-slate-700" : "bg-gradient-to-br from-primary/90 to-accent/80"}`} />
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-input bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {role === "admin" ? <FaShieldAlt size={20} className="text-white" /> : <FaGraduationCap size={22} className="text-white" />}
            </div>
            <span className="font-black text-2xl xl:text-3xl text-white">CCOG</span>
          </div>

          {role === "admin" ? (
            <>
              <h2 className="text-2xl xl:text-3xl font-extrabold text-white leading-tight">
                Admin Control<br />Panel Access
              </h2>
              <p className="mt-4 text-white/60 text-sm xl:text-base max-w-sm mx-auto">
                Manage students, applications, documents, and payments from one powerful dashboard.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-left">
                {[
                  { label: "Applications", value: "Manage" },
                  { label: "Students", value: "Monitor" },
                  { label: "Payments", value: "Track" },
                  { label: "Documents", value: "Verify" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-card p-3">
                    <p className="text-white font-bold text-lg">{s.value}</p>
                    <p className="text-white/60 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl xl:text-3xl font-extrabold text-white leading-tight">
                Your Academic<br />Journey Starts Here
              </h2>
              <p className="mt-4 text-white/60 text-sm xl:text-base max-w-sm mx-auto">
                Apply for courses, track your admission, and receive your offer letter — all in one place.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-left">
                {[
                  { label: "Students", value: "12,000+" },
                  { label: "Courses", value: "200+" },
                  { label: "Colleges", value: "50+" },
                  { label: "Satisfaction", value: "98%" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-card p-3">
                    <p className="text-white font-bold text-lg">{s.value}</p>
                    <p className="text-white/60 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-input bg-primary flex items-center justify-center">
              <FaGraduationCap size={16} className="text-white" />
            </div>
            <span className="font-black text-xl text-foreground">CCOG</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground text-center lg:text-left">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mt-1 text-center lg:text-left">Login to your portal</p>

          {/* Role Toggle */}
          <div className="flex gap-2 mt-5 p-1 bg-surface rounded-input border border-border">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-sm transition-colors ${role === "student" ? "bg-background shadow-soft text-foreground" : "text-muted-foreground"}`}
            >
              <FaGraduationCap size={14} /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-sm transition-colors ${role === "admin" ? "bg-background shadow-soft text-foreground" : "text-muted-foreground"}`}
            >
              <FaShieldAlt size={13} /> Admin
            </button>
          </div>

          {role === "admin" && (
            <div className="mt-3 p-3 bg-accent/10 border border-accent/30 rounded-input text-xs text-accent font-semibold">
              Logging in as Admin → redirects to Admin Panel
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-input text-xs text-destructive font-semibold">
              {error}
            </div>
          )}

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
              <div className="relative mt-1.5">
                <FaEnvelope size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative mt-1.5">
                <FaLock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs sm:text-sm text-accent hover:underline font-semibold">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-input font-bold hover:opacity-90 transition-all active:scale-[0.98] text-sm disabled:opacity-60"
            >
              {loading ? "Logging in..." : `Login as ${role === "admin" ? "Admin" : "Student"}`}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or</span></div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent font-bold hover:underline">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
