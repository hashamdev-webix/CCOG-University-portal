import { useEffect, useState } from "react";
import { CheckCircle, Clock, Circle, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
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

const timelineStatuses = ["submitted", "under_review", "documents_pending", "approved", "offer_generated"];
const timelineLabels: Record<string, string> = {
  submitted: "Application Submitted",
  under_review: "Under Review",
  documents_pending: "Documents Verification",
  approved: "Approved",
  offer_generated: "Offer Letter Issued",
};

export default function StudentOverview() {
  const { user } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications/my-applications")
      .then((res) => {
        const apps = res.data.applications;
        if (apps.length > 0) {
          const latest = apps[0];
          setApplication(latest);
          return Promise.all([
            api.get(`/documents/my/${latest._id}`),
            api.get("/payments/my-payments"),
          ]);
        }
        return null;
      })
      .then((results) => {
        if (results) {
          const [docRes, payRes] = results;
          setDocuments(docRes.data.documents || []);
          const paid = payRes.data.payments?.find((p: any) => p.paymentStatus === "paid");
          setPayment(paid || null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const currentStatusIndex = application
    ? timelineStatuses.indexOf(application.status)
    : -1;

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">
        Good Morning, {user?.firstName || "Student"} 👋 — here's your overview
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-background border border-border rounded-card shadow-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Application Status</p>
          {application ? (
            <StatusBadge variant={statusVariantMap[application.status] || "info"}>
              {statusLabelMap[application.status] || application.status}
            </StatusBadge>
          ) : (
            <StatusBadge variant="info">No Application</StatusBadge>
          )}
        </div>
        <div className="bg-background border border-border rounded-card shadow-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Documents Uploaded</p>
          <p className="text-lg font-bold text-foreground">{documents.length}</p>
          <div className="mt-1 h-1.5 bg-border rounded-full">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: documents.length > 0 ? "100%" : "0%" }}
            />
          </div>
        </div>
       
        <div className="bg-background border border-border rounded-card shadow-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Offer Letter</p>
          <StatusBadge variant={application?.status === "offer_generated" ? "success" : "info"}>
            {application?.status === "offer_generated" ? "Ready" : "Pending"}
          </StatusBadge>
        </div>
      </div>

     

      {application && (
        <div className="bg-background border border-border rounded-card shadow-soft p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-4">Selected Course</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: "Course", value: application.courseId?.title || "—" },
              { label: "Mode", value: application.courseId?.mode || "—" },
              { label: "Duration", value: application.courseId?.duration || "—" },
              { label: "Application #", value: application.applicationNumber },
            ].map((r) => (
              <div key={r.label} className="flex justify-between">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="text-foreground font-medium">{r.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge variant={statusVariantMap[application.status] || "info"}>
                {statusLabelMap[application.status] || application.status}
              </StatusBadge>
            </div>
          </div>
          <Link
            to="/dashboard/application"
            className="mt-4 block text-center py-2 border border-accent text-accent rounded-input text-sm hover:bg-accent/5 transition-colors flex items-center justify-center gap-1"
          >
            View Application <ExternalLink size={12} />
          </Link>
        </div>
      )}

      {!application && (
        <div className="bg-background border border-border rounded-card shadow-soft p-12 text-center mb-8">
          <p className="text-muted-foreground text-sm">You haven't submitted an application yet.</p>
          <Link to="/dashboard/application" className="mt-3 inline-block text-sm text-accent hover:underline">
            Apply Now
          </Link>
        </div>
      )}
    </>
  );
}
