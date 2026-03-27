import { useState } from "react";
import { Save, User, Lock, Bell, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function StudentSettingsPage() {
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: (user as any)?.phone || "",
    city: (user as any)?.city || "",
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: true, browser: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/auth/me/update", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-background border border-border rounded-card shadow-soft p-6">
        <div className="flex items-center gap-2 mb-5">
          <User size={16} className="text-accent" />
          <h3 className="font-semibold text-foreground">Profile Information</h3>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-accent text-2xl font-bold">{user?.firstName?.[0] || "S"}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-surface text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={16} className="text-accent" />
          <h3 className="font-semibold text-foreground">Change Password</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell size={16} className="text-accent" />
          <h3 className="font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "email" as const, label: "Email Notifications", desc: "Application updates, fee reminders" },
            { key: "sms" as const, label: "SMS Notifications", desc: "Important alerts via SMS" },
            { key: "browser" as const, label: "Browser Notifications", desc: "Push notifications in browser" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key] }))}
                className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${notifications[n.key] ? "bg-accent" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[n.key] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-accent" />
          <h3 className="font-semibold text-foreground">Privacy & Security</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <button className="px-3 py-1.5 border border-accent text-accent rounded-input text-xs hover:bg-accent/5 transition-colors">Enable</button>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently remove your account</p>
            </div>
            <button className="px-3 py-1.5 border border-destructive/30 text-destructive rounded-input text-xs hover:bg-destructive/5 transition-colors">Delete</button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-input text-sm font-medium transition-all ${saved ? "bg-success text-white" : "bg-primary text-primary-foreground hover:opacity-90"}`}
      >
        <Save size={14} />
        {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
