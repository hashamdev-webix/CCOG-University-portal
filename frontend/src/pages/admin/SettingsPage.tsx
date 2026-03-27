import { useState } from "react";
import { Save, Bell, Shield, Globe, Palette } from "lucide-react";

export default function SettingsPage() {
  const [portalName, setPortalName] = useState("CCOG University Portal");
  const [email, setEmail] = useState("admin@ccog.edu");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [notifications, setNotifications] = useState({ email: true, sms: false, browser: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage portal configuration</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="bg-background border border-border rounded-card shadow-soft p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe size={16} className="text-accent" />
            <h3 className="font-semibold text-foreground">General Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Portal Name</label>
              <input
                value={portalName}
                onChange={(e) => setPortalName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Contact Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Contact Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
              <input
                defaultValue="Islamabad, Pakistan"
                className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-background border border-border rounded-card shadow-soft p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={16} className="text-accent" />
            <h3 className="font-semibold text-foreground">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: "email" as const, label: "Email Notifications", desc: "Receive updates via email" },
              { key: "sms" as const, label: "SMS Notifications", desc: "Receive updates via SMS" },
              { key: "browser" as const, label: "Browser Notifications", desc: "Show browser push notifications" },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${notifications[n.key] ? "bg-accent" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[n.key] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-background border border-border rounded-card shadow-soft p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield size={16} className="text-accent" />
            <h3 className="font-semibold text-foreground">Security</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-background border border-border rounded-card shadow-soft p-6">
          <div className="flex items-center gap-2 mb-5">
            <Palette size={16} className="text-accent" />
            <h3 className="font-semibold text-foreground">Appearance</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
            <div className="flex gap-3">
              {["Light", "Dark", "System"].map((t) => (
                <button
                  key={t}
                  className={`px-4 py-2 text-sm rounded-input border transition-colors ${t === "Light" ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:bg-surface"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-input text-sm font-medium transition-all ${saved ? "bg-success text-white" : "bg-primary text-primary-foreground hover:opacity-90"}`}
        >
          <Save size={14} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
