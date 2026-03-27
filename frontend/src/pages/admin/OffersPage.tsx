import { StatusBadge } from "@/components/StatusBadge";
import { Award, Download, Send, Plus } from "lucide-react";

const offers = [
  { id: "OL-001", student: "Sara Ahmed", course: "MBA", issued: "Dec 2, 2025", expiry: "Jan 2, 2026", status: "success" as const, statusLabel: "Accepted" },
  { id: "OL-002", student: "Ayesha Malik", course: "MBA", issued: "Dec 3, 2025", expiry: "Jan 3, 2026", status: "info" as const, statusLabel: "Sent" },
  { id: "OL-003", student: "Ali Hassan", course: "BS CS", issued: "Dec 4, 2025", expiry: "Jan 4, 2026", status: "warning" as const, statusLabel: "Pending" },
  { id: "OL-004", student: "Fatima Ali", course: "BBA", issued: "Dec 5, 2025", expiry: "Jan 5, 2026", status: "info" as const, statusLabel: "Sent" },
  { id: "OL-005", student: "Ahmed Raza", course: "MS DS", issued: "Dec 6, 2025", expiry: "Jan 6, 2026", status: "danger" as const, statusLabel: "Expired" },
];

export default function OffersPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Offer Letters</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage admission offer letters</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all">
          <Plus size={14} /> Generate Offer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Issued", value: "5", color: "border-l-accent" },
          { label: "Accepted", value: "1", color: "border-l-success" },
          { label: "Sent", value: "2", color: "border-l-info" },
          { label: "Expired", value: "1", color: "border-l-destructive" },
        ].map((s) => (
          <div key={s.label} className={`bg-background border border-border rounded-card shadow-soft p-4 border-l-4 ${s.color}`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((o) => (
          <div key={o.id} className="bg-background border border-border rounded-card shadow-soft p-5 hover:shadow-lift transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Award size={18} className="text-accent" />
              </div>
              <StatusBadge variant={o.status}>{o.statusLabel}</StatusBadge>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-1">{o.id}</p>
            <h3 className="font-semibold text-foreground">{o.student}</h3>
            <p className="text-sm text-muted-foreground mb-4">{o.course}</p>
            <div className="text-xs text-muted-foreground space-y-1 mb-4">
              <div className="flex justify-between">
                <span>Issued</span>
                <span className="text-foreground">{o.issued}</span>
              </div>
              <div className="flex justify-between">
                <span>Expiry</span>
                <span className="text-foreground">{o.expiry}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 text-xs border border-border rounded-input py-1.5 hover:bg-surface transition-colors">
                <Download size={12} /> Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 text-xs bg-accent/10 text-accent rounded-input py-1.5 hover:bg-accent/20 transition-colors">
                <Send size={12} /> Resend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
