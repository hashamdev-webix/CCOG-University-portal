import { useState, useEffect } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle, Clock, Circle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  duration: string;
  fee: number;
  mode: string;
}

interface Application {
  _id: string;
  applicationNumber: string;
  status: string;
  createdAt: string;
  courseId: Course;
}

const statusVariantMap: Record<string, "warning" | "success" | "danger" | "info"> = {
  submitted: "warning",
  under_review: "info",
  documents_pending: "info",
  approved: "success",
  rejected: "danger",
  offer_generated: "success",
};

const steps = ["Personal Info", "Course Selected", "Documents Uploaded", "Fee Paid", "Under Review"];

export default function ApplicationPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/courses"),
      api.get("/applications/my-applications"),
    ]).then(([cRes, aRes]) => {
      setCourses(cRes.data.courses || []);
      setMyApplications(aRes.data.applications || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!selectedCourseId) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/applications/create", { courseId: selectedCourseId });
      const res = await api.get("/applications/my-applications");
      setMyApplications(res.data.applications || []);
      setSelectedCourseId("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl">
      {/* Existing Applications */}
      {myApplications.length > 0 && (
        <div className="space-y-4 mb-6">
          {myApplications.map((app) => (
            <div key={app._id} className="bg-background border border-border rounded-card shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{app.courseId?.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">ID: {app.applicationNumber} · {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <StatusBadge variant={statusVariantMap[app.status] || "info"}>{app.status.replace("_", " ")}</StatusBadge>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-px bg-border z-0" />
                {steps.map((s, i) => {
                  const done = i < 2;
                  const current = i === 2;
                  return (
                    <div key={s} className="flex flex-col items-center gap-2 z-10 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? "bg-success text-white" : current ? "bg-warning text-white" : "bg-background border-2 border-border"}`}>
                        {done ? <CheckCircle size={16} /> : current ? <Clock size={16} /> : <Circle size={14} className="text-border" />}
                      </div>
                      <p className={`text-xs text-center hidden sm:block ${done ? "text-foreground font-medium" : current ? "text-warning font-medium" : "text-muted-foreground"}`}>{s}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-5">
                <Link to="/dashboard/documents" className="flex-1 text-center py-2.5 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all">
                  Upload Documents
                </Link>
                <Link to="/dashboard/payments" className="flex-1 text-center py-2.5 border border-border text-foreground rounded-input text-sm font-medium hover:bg-surface transition-colors">
                  Pay Fees
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Application */}
      <div className="bg-background border border-border rounded-card shadow-soft p-6">
        <h2 className="font-semibold text-foreground mb-4">Apply for a Course</h2>
        {error && <p className="text-xs text-destructive mb-3">{error}</p>}
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {courses.map((c) => (
            <div key={c._id} onClick={() => setSelectedCourseId(c._id)}
              className={`border rounded-card p-4 cursor-pointer transition-all ${selectedCourseId === c._id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.duration} · {c.mode}</p>
                  <p className="text-sm font-bold text-foreground mt-2">PKR {c.fee?.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/sem</span></p>
                </div>
                {selectedCourseId === c._id && <CheckCircle size={18} className="text-accent shrink-0" />}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} disabled={!selectedCourseId || submitting}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-input font-medium hover:opacity-90 transition-all disabled:opacity-50">
          <Send size={16} /> {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
