import { useState, useEffect } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle, Clock, BookOpen, CreditCard, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Course {
  _id: string;
  title: string;
  duration: string;
  fee: number;
  mode: string;
  isFree?: boolean;
  thumbnail?: string;
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

const formatStatus = (status: string) => {
  return status.replace(/_/g, " ");
};

const getDisplayStatus = (status: string) => {
  if (status === "approved" || status === "offer_generated") {
    return "Enrolled";
  }
  return formatStatus(status);
};

export default function ApplicationPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
const {currency}=useAuth()
  const fetchData = async () => {
    try {
      const [cRes, aRes] = await Promise.all([
        api.get("/courses"),
        api.get("/applications/my-applications"),
      ]);

      setCourses(cRes.data.courses || []);
      setMyApplications(aRes.data.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const getCoursePrice = (course: Course) => {
    if (course.isFree || Number(course.fee) === 0) return "Free";
    return `${currency} ${course.fee?.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Existing Applications */}
      {myApplications.length > 0 && (
        <div className="space-y-4 mb-6">
          {myApplications.map((app) => (
            <div
              key={app._id}
              className="bg-background border border-border rounded-card shadow-soft p-5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {app.courseId?.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Application ID: {app.applicationNumber}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <StatusBadge variant={statusVariantMap[app.status] || "info"}>
                  {getDisplayStatus(app.status)}
                </StatusBadge>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <div className="border border-border rounded-card p-4 bg-surface/30">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <BookOpen size={16} />
                    <span className="text-xs font-medium">Course</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {app.courseId?.title}
                  </p>
                </div>

                <div className="border border-border rounded-card p-4 bg-surface/30">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <Clock size={16} />
                    <span className="text-xs font-medium">Duration</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {app.courseId?.duration || "N/A"}
                  </p>
                </div>

                <div className="border border-border rounded-card p-4 bg-surface/30">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <CreditCard size={16} />
                    <span className="text-xs font-medium">Fee</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {getCoursePrice(app.courseId)}
                  </p>
                </div>
              </div>

              <div className="rounded-card border border-border bg-primary/5 p-4 mb-5">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Application Submitted Successfully
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-6">
                      Your application has been recorded successfully. If payment has already been completed,
                      you can now wait for the college review and next update.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/courses/details/${app.courseId?._id}`}
                  className="flex-1 text-center py-2.5 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all"
                >
                  View Course
                </Link>

                <Link
                  to="/"
                  className="flex-1 text-center py-2.5 border border-border text-foreground rounded-input text-sm font-medium hover:bg-surface transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    
    </div>
  );
}