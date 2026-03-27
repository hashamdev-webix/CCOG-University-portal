import { useState, useEffect } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, CheckCircle, XCircle, Eye, Clock } from "lucide-react";
import api from "@/lib/api";

interface Document {
  _id: string;
  type: string;
  originalName: string;
  fileUrl: string;
  size: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  studentId: { firstName: string; lastName: string; email: string } | null;
  applicationId: string;
}

const statusVariantMap = {
  approved: "success" as const,
  pending: "warning" as const,
  rejected: "danger" as const,
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicationId, setApplicationId] = useState("");
  const [searchAppId, setSearchAppId] = useState("");

  const fetchDocs = (appId: string) => {
    if (!appId) return;
    setLoading(true);
    api.get(`/documents/admin/application/${appId}`)
      .then((res) => setDocuments(res.data.documents || []))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // fetch all applications first to get first applicationId
    api.get("/applications/admin")
      .then((res) => {
        const apps = res.data.applications || [];
        if (apps.length > 0) {
          setApplicationId(apps[0]._id);
          fetchDocs(apps[0]._id);
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    await api.put(`/documents/admin/${id}/status`, { status });
    setDocuments((prev) => prev.map((d) => d._id === id ? { ...d, status } : d));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAppId.trim()) {
      setApplicationId(searchAppId.trim());
      fetchDocs(searchAppId.trim());
    }
  };

  const summary = {
    total: documents.length,
    approved: documents.filter((d) => d.status === "approved").length,
    pending: documents.filter((d) => d.status === "pending").length,
    rejected: documents.filter((d) => d.status === "rejected").length,
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Documents</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage and verify student documents</p>
      </div>

      {/* Search by Application ID */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input value={searchAppId} onChange={(e) => setSearchAppId(e.target.value)}
          placeholder="Enter Application ID..."
          className="flex-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all">
          Search
        </button>
      </form>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: summary.total, icon: FileText, color: "border-l-accent" },
          { label: "Verified", value: summary.approved, icon: CheckCircle, color: "border-l-success" },
          { label: "Pending", value: summary.pending, icon: Clock, color: "border-l-warning" },
          { label: "Rejected", value: summary.rejected, icon: XCircle, color: "border-l-destructive" },
        ].map((s) => (
          <div key={s.label} className={`bg-background border border-border rounded-card shadow-soft p-4 border-l-4 ${s.color}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <s.icon size={14} className="text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Document Queue</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Document Type</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">Uploaded</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">Size</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d._id} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="px-6 py-3 font-medium text-foreground">
                      {d.studentId ? `${d.studentId.firstName} ${d.studentId.lastName}` : "N/A"}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-accent" />{d.type}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell">{(d.size / 1024).toFixed(1)} KB</td>
                    <td className="px-6 py-3"><StatusBadge variant={statusVariantMap[d.status] || "info"}>{d.status}</StatusBadge></td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <a href={d.fileUrl} target="_blank" rel="noreferrer"
                          className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground transition-colors" title="View">
                          <Eye size={14} />
                        </a>
                        <button onClick={() => handleStatusUpdate(d._id, "approved")}
                          className="p-1.5 hover:bg-success/10 rounded-input text-muted-foreground hover:text-success transition-colors" title="Verify">
                          <CheckCircle size={14} />
                        </button>
                        <button onClick={() => handleStatusUpdate(d._id, "rejected")}
                          className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive transition-colors" title="Reject">
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground text-sm">No documents found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
