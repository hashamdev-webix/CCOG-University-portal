import { useState, useEffect } from "react";
import { CreditCard, CheckCircle, Clock, Shield } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

interface Payment {
  _id: string;
  amount: number;
  currency: string;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  courseId: { title: string; fee: number } | null;
  applicationId: { applicationNumber: string } | null;
}

interface Application {
  _id: string;
  applicationNumber: string;
  courseId: { title: string; fee: number };
}

const statusVariantMap = {
  paid: "success" as const,
  pending: "warning" as const,
  failed: "danger" as const,
};

export default function PaymentsStudentPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/payments/my-payments"),
      api.get("/applications/my-applications"),
    ]).then(([pRes, aRes]) => {
      setPayments(pRes.data.payments || []);
      const apps = aRes.data.applications || [];
      setApplications(apps);
      if (apps.length > 0) setSelectedAppId(apps[0]._id);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handlePay = async () => {
    if (!selectedAppId) return;
    setPaying(true);
    setError("");
    try {
      const res = await api.post("/payments/checkout-session", { applicationId: selectedAppId });
      // redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Payment failed");
      setPaying(false);
    }
  };

  const selectedApp = applications.find((a) => a._id === selectedAppId);

  if (loading) return <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl">
      {/* Fee Summary */}
      {selectedApp && (
        <div className="bg-background border border-border rounded-card shadow-soft p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4">Fee Summary</h2>
          {applications.length > 1 && (
            <select value={selectedAppId} onChange={(e) => setSelectedAppId(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent">
              {applications.map((a) => (
                <option key={a._id} value={a._id}>{a.applicationNumber} — {a.courseId?.title}</option>
              ))}
            </select>
          )}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Course</span>
              <span className="text-foreground font-medium">{selectedApp.courseId?.title}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Application</span>
              <span className="text-foreground font-medium">{selectedApp.applicationNumber}</span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-foreground">
              <span>Total Due</span>
              <span className="text-primary">USD {selectedApp.courseId?.fee?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pay via Stripe */}
      {applications.length > 0 && (
        <div className="bg-background border border-border rounded-card shadow-soft p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4">Make Payment</h2>
          {error && <p className="text-xs text-destructive mb-3">{error}</p>}
          <div className="flex items-center gap-3 p-4 bg-surface rounded-card mb-5">
            <CreditCard size={20} className="text-accent shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Pay via Stripe</p>
              <p className="text-xs text-muted-foreground">You will be redirected to Stripe secure checkout</p>
            </div>
          </div>
          <button onClick={handlePay} disabled={paying || !selectedAppId}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-input font-medium hover:opacity-90 transition-all disabled:opacity-60">
            <Shield size={16} />
            {paying ? "Redirecting..." : `Pay USD ${selectedApp?.courseId?.fee?.toLocaleString() || ""}`}
          </button>
          <p className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
            <Shield size={12} /> Secured by Stripe
          </p>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Payment History</h3>
        </div>
        <div className="divide-y divide-border">
          {payments.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No payments yet</p>
          )}
          {payments.map((p) => (
            <div key={p._id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{p.courseId?.title || "Course"}</p>
                <p className="text-xs text-muted-foreground">{p.applicationId?.applicationNumber} · {new Date(p.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{p.currency?.toUpperCase()} {p.amount?.toLocaleString()}</p>
                <StatusBadge variant={statusVariantMap[p.paymentStatus] || "info"}>{p.paymentStatus}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
