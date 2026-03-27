import { useState, useEffect } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

interface Application {
  _id: string;
  applicationNumber: string;
  status: string;
  createdAt: string;
  studentId: { firstName: string; lastName: string; email: string; phone: string } | null;
  courseId: { title: string; mode: string; duration: string; fee: number } | null;
}

const statusVariantMap: Record<string, "warning" | "success" | "danger" | "info"> = {
  submitted: "warning",
  under_review: "info",
  documents_pending: "info",
  approved: "success",
  rejected: "danger",
  offer_generated: "success",
};

const filters = ["All", "submitted", "under_review", "approved", "rejected", "documents_pending", "offer_generated"];
const filterLabels: Record<string, string> = {
  All: "All", submitted: "Submitted", under_review: "Under Review",
  approved: "Approved", rejected: "Rejected", documents_pending: "Docs Pending", offer_generated: "Offer Generated",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchApplications = () => {
    setLoading(true);
    api.get("/applications/admin")
      .then((res) => setApplications(res.data.applications || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleStatusUpdate = async () => {
    if (!selectedApp || !newStatus) return;
    setUpdating(true);
    await api.put(`/applications/admin/${selectedApp._id}/status`, { status: newStatus });
    setUpdating(false);
    setSelectedApp(null);
    fetchApplications();
  };

  const filtered = applications.filter((a) => {
    const name = a.studentId ? `${a.studentId.firstName} ${a.studentId.lastName}` : "";
    const course = a.courseId?.title || "";
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) || course.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || a.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Applications</h2>
          <p className="text-sm text-muted-foreground mt-1">{applications.length} total applications</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or course..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-input font-medium transition-colors ${activeFilter === f ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:bg-surface"}`}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">Course</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a._id} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="px-6 py-3 text-muted-foreground font-mono text-xs">{a.applicationNumber}</td>
                    <td className="px-6 py-3">
                      <p className="font-medium text-foreground">{a.studentId ? `${a.studentId.firstName} ${a.studentId.lastName}` : "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{a.studentId?.email}</p>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">{a.courseId?.title || "N/A"}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3"><StatusBadge variant={statusVariantMap[a.status] || "info"}>{a.status.replace("_", " ")}</StatusBadge></td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedApp(a); setNewStatus(a.status); }}
                          className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground transition-colors" title="View / Update">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => api.put(`/applications/admin/${a._id}/status`, { status: "approved" }).then(fetchApplications)}
                          className="p-1.5 hover:bg-success/10 rounded-input text-muted-foreground hover:text-success transition-colors" title="Approve">
                          <CheckCircle size={14} />
                        </button>
                        <button onClick={() => api.put(`/applications/admin/${a._id}/status`, { status: "rejected" }).then(fetchApplications)}
                          className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive transition-colors" title="Reject">
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground text-sm">No applications found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-card border border-border w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Update Status</h2>
            <p className="text-sm text-muted-foreground mb-1">Application: <span className="font-medium text-foreground">{selectedApp.applicationNumber}</span></p>
            <p className="text-sm text-muted-foreground mb-4">Student: <span className="font-medium text-foreground">{selectedApp.studentId ? `${selectedApp.studentId.firstName} ${selectedApp.studentId.lastName}` : "N/A"}</span></p>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent mb-4">
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="documents_pending">Documents Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="offer_generated">Offer Generated</option>
            </select>
            <div className="flex gap-3">
              <button onClick={() => setSelectedApp(null)} className="flex-1 py-2 border border-border rounded-input text-sm font-medium hover:bg-surface transition-colors">Cancel</button>
              <button onClick={handleStatusUpdate} disabled={updating}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all disabled:opacity-60">
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
