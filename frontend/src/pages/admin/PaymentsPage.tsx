import { useState, useEffect } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";
import api from "@/lib/api";

interface Payment {
  _id: string;
  amount: number;
  currency: string;
  paymentStatus: "pending" | "paid" | "failed";
  provider: string;
  createdAt: string;
  studentId: { firstName: string; lastName: string; email: string } | null;
  courseId: { title: string; fee: number } | null;
  applicationId: { applicationNumber: string } | null;
}

const statusVariantMap = {
  paid: "success" as const,
  pending: "warning" as const,
  failed: "danger" as const,
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/payments/admin")
      .then((res) => setPayments(res.data.payments || []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = payments.filter((p) => p.paymentStatus === "paid").reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter((p) => p.paymentStatus === "pending").reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter((p) => p.paymentStatus === "paid").length;

  const kpis = [
    { label: "Total Revenue", value: `USD ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "border-l-accent" },
    { label: "Paid", value: `${paidCount} payments`, icon: CheckCircle, color: "border-l-success" },
    { label: "Pending", value: `USD ${pending.toLocaleString()}`, icon: Clock, color: "border-l-warning" },
    { label: "Total", value: `${payments.length} transactions`, icon: TrendingUp, color: "border-l-primary" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Payments</h2>
          <p className="text-sm text-muted-foreground mt-1">Fee collection overview</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className={`bg-background border border-border rounded-card shadow-soft p-4 border-l-4 ${k.color}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
              <k.icon size={14} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground tabular-nums">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">Course</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">Provider</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="px-6 py-3">
                      <p className="font-medium text-foreground">{p.studentId ? `${p.studentId.firstName} ${p.studentId.lastName}` : "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{p.studentId?.email}</p>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">{p.courseId?.title || "N/A"}</td>
                    <td className="px-6 py-3 font-semibold text-foreground">{p.currency?.toUpperCase()} {p.amount?.toLocaleString()}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell capitalize">{p.provider}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3"><StatusBadge variant={statusVariantMap[p.paymentStatus] || "info"}>{p.paymentStatus}</StatusBadge></td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground text-sm">No payments found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
