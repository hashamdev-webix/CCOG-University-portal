import { useEffect, useState } from "react";
import { Award, Download, Mail, CheckCircle, Clock } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function OfferLetterPage() {
  const { user } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications/my-applications")
      .then((res) => {
        const apps = res.data.applications;
        if (apps.length > 0) setApplication(apps[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>;
  }

  const isReady = application?.status === "offer_generated" || application?.status === "approved";

  if (!application || !isReady) {
    return (
      <div className="max-w-2xl">
        <div className="bg-background border border-border rounded-card shadow-soft p-12 text-center">
          <Clock size={48} className="text-warning mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">Offer Letter Pending</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
            Your application is still under review. Once approved, your offer letter will appear here.
          </p>
          {application && (
            <StatusBadge variant="warning" className="mt-4">
              {application.status.replace(/_/g, " ")}
            </StatusBadge>
          )}
        </div>
      </div>
    );
  }

  const studentName = `${application.personalInfo?.firstName || user?.firstName} ${application.personalInfo?.lastName || user?.lastName}`;
  const courseTitle = application.courseId?.title || "—";
  const issuedDate = new Date(application.reviewedAt || application.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="max-w-2xl">
      <div className="bg-success/10 border border-success/30 rounded-card p-4 mb-6 flex items-center gap-3">
        <CheckCircle size={18} className="text-success shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">Congratulations! Your offer letter is ready.</p>
          <p className="text-xs text-muted-foreground">Issued on {issuedDate}</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
          <div className="w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
            <Award size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">CCOG University</h1>
          <p className="text-white/70 text-sm mt-1">Islamabad, Pakistan</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Official Document</p>
            <h2 className="text-2xl font-bold text-foreground">Offer Letter</h2>
            <p className="text-sm text-muted-foreground mt-1">Ref: {application.applicationNumber}</p>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{issuedDate}</p>
          <p className="text-sm text-foreground mb-4">Dear <span className="font-semibold">{studentName}</span>,</p>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We are pleased to offer you admission to <span className="text-foreground font-medium">CCOG University</span> for the program of{" "}
            <span className="text-foreground font-medium">{courseTitle}</span>.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            This offer is conditional upon verification of your original documents and payment of the semester fee.
          </p>

          <div className="bg-surface rounded-card p-4 mb-6 space-y-2 text-sm">
            {[
              { label: "Student Name", value: studentName },
              { label: "Program", value: courseTitle },
              { label: "Duration", value: application.courseId?.duration || "—" },
              { label: "Mode", value: application.courseId?.mode || "—" },
              { label: "Application #", value: application.applicationNumber },
            ].map((r) => (
              <div key={r.label} className="flex justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="text-foreground font-medium">{r.value}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            We look forward to welcoming you to our institution. If you have any questions, please contact our admissions office.
          </p>

          <div className="border-t border-border pt-6 flex justify-between items-end">
            <div>
              <div className="w-32 h-px bg-foreground mb-1" />
              <p className="text-sm font-semibold text-foreground">Prof. Sara Khan</p>
              <p className="text-xs text-muted-foreground">Dean of Admissions</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xs text-center leading-tight">CCOG<br />SEAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all">
          <Download size={16} /> Download PDF
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border text-foreground rounded-input text-sm font-medium hover:bg-surface transition-colors">
          <Mail size={16} /> Send to Email
        </button>
      </div>
    </div>
  );
}
