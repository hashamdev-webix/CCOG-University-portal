import { useEffect, useState } from "react";
import { TrendingUp, Clock, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

const statusVariantMap: Record<string, "warning" | "success" | "danger" | "info"> = {
  submitted: "warning",
  under_review: "info",
  documents_pending: "warning",
  approved: "success",
  rejected: "danger",
  offer_generated: "success",
};

const statusLabelMap: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  documents_pending: "Docs Pending",
  approved: "Approved",
  rejected: "Rejected",
  offer_generated: "Offer Generated",
};

export default function AdminOverview() {
  const [applications, setApplications] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/applications/admin"), api.get("/payments/admin")])
      .then(([appRes, payRes]) => {
        setApplications(appRes.data.applications);
        setPayments(payRes.data.payments);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const pending = applications.filter((a) => a.status === "submitted").length;

  const approvedToday = applications.filter((a) => {
    if (a.status !== "approved" || !a.reviewedAt) return false;
    return new Date(a.reviewedAt).toDateString() === new Date().toDateString();
  }).length;

  const statusCounts = applications.reduce((acc: Record<string, number>, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const docsPending = applications.filter((a) => a.status === "documents_pending");

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Applications", value: String(applications.length), color: "border-l-accent", icon: TrendingUp },
          { label: "Pending Review", value: String(pending), color: "border-l-warning", icon: Clock },
          { label: "Approved Today", value: String(approvedToday), color: "border-l-success", icon: CheckCircle },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "border-l-purple-500", icon: TrendingUp },
        ].map((k) => (
          <div key={k.label} className={`bg-background border border-border rounded-card shadow-soft p-5 border-l-4 ${k.color}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
              <k.icon size={16} className="text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3 bg-background border border-border rounded-card shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Course</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 8).map((a) => (
                  <tr key={a._id} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="px-6 py-3 font-medium text-foreground">
                      {a.studentId?.firstName} {a.studentId?.lastName}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{a.courseId?.title}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge variant={statusVariantMap[a.status] || "info"}>
                        {statusLabelMap[a.status] || a.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No applications yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2 bg-background border border-border rounded-card shadow-soft p-6">
          <h2 className="font-semibold text-foreground mb-4">Application Breakdown</h2>
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 rounded-full border-8 border-success relative flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { color: "bg-success", label: "Approved", key: "approved" },
              { color: "bg-warning", label: "Submitted", key: "submitted" },
              { color: "bg-destructive", label: "Rejected", key: "rejected" },
              { color: "bg-accent", label: "Under Review", key: "under_review" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-medium text-foreground">{statusCounts[item.key] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {docsPending.length > 0 && (
        <div className="bg-background border border-border rounded-card shadow-soft p-6">
          <h2 className="font-semibold text-foreground mb-4">Pending Documents</h2>
          <div className="space-y-3">
            {docsPending.map((a) => (
              <div key={a._id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent text-sm font-medium">{a.studentId?.firstName?.[0]}</span>
                  </div>
                  <span className="text-sm text-foreground">
                    {a.studentId?.firstName} {a.studentId?.lastName}
                  </span>
                </div>
                <StatusBadge variant="warning">Docs Pending</StatusBadge>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
