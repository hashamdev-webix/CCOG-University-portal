import { useState, useEffect } from "react";
import { Upload, CheckCircle, Clock, XCircle, FileText, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

interface Document {
  _id: string;
  type: string;
  originalName: string;
  fileUrl: string;
  size: number;
  status: "pending" | "approved" | "rejected";
}

interface Application {
  _id: string;
  applicationNumber: string;
  courseId: { title: string };
}

const docTypes = [
  { value: "id_card", label: "CNIC / ID Card" },
  { value: "transcript", label: "Transcript / Certificate" },
  { value: "photo", label: "Passport Size Photo" },
  { value: "passport", label: "Passport" },
  { value: "certificate", label: "Other Certificate" },
  { value: "resume", label: "Resume / CV" },
  { value: "other", label: "Other" },
];

const statusConfig = {
  approved: { label: "Verified", variant: "success" as const, icon: CheckCircle },
  pending: { label: "Under Review", variant: "warning" as const, icon: Clock },
  rejected: { label: "Rejected", variant: "danger" as const, icon: XCircle },
};

export default function DocumentsUploadPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState("id_card");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/applications/my-applications")
      .then((res) => {
        const apps = res.data.applications || [];
        setApplications(apps);
        if (apps.length > 0) setSelectedAppId(apps[0]._id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedAppId) return;
    api.get(`/documents/my/${selectedAppId}`)
      .then((res) => setDocuments(res.data.documents || []))
      .catch(() => setDocuments([]));
  }, [selectedAppId]);

  const handleUpload = async (file: File) => {
    if (!selectedAppId) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", selectedType);
      await api.post(`/documents/upload/${selectedAppId}`, fd);
      const res = await api.get(`/documents/my/${selectedAppId}`);
      setDocuments(res.data.documents || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/documents/${id}`);
    setDocuments((prev) => prev.filter((d) => d._id !== id));
  };

  if (loading) return <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>;

  if (applications.length === 0) {
    return (
      <div className="max-w-3xl text-center py-16">
        <p className="text-muted-foreground text-sm">No applications found. Please submit an application first.</p>
      </div>
    );
  }

  const uploaded = documents.length;
  const total = docTypes.length;

  return (
    <div className="max-w-3xl">
      {/* Application Selector */}
      {applications.length > 1 && (
        <div className="mb-4">
          <label className="text-xs font-semibold text-muted-foreground">Select Application</label>
          <select value={selectedAppId} onChange={(e) => setSelectedAppId(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent">
            {applications.map((a) => (
              <option key={a._id} value={a._id}>{a.applicationNumber} — {a.courseId?.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Progress */}
      <div className="bg-background border border-border rounded-card shadow-soft p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Upload Progress</p>
          <p className="text-sm font-bold text-foreground">{uploaded} / {total}</p>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(uploaded / total) * 100}%` }} />
        </div>
      </div>

      {/* Upload New */}
      <div className="bg-background border border-border rounded-card shadow-soft p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4">Upload Document</h2>
        {error && <p className="text-xs text-destructive mb-3">{error}</p>}
        <div className="flex gap-3 mb-3">
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent">
            {docTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <label className={`cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
            {uploading ? "Uploading..." : "Choose File"}
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0]); }} />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">PDF, JPG, PNG · Max 5MB</p>
      </div>

      {/* Uploaded Documents */}
      <div className="space-y-3">
        {documents.map((doc) => {
          const cfg = statusConfig[doc.status] || statusConfig.pending;
          const Icon = cfg.icon;
          return (
            <div key={doc._id} className="bg-background border border-border rounded-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-input bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.originalName}</p>
                    <p className="text-xs text-muted-foreground">{docTypes.find(t => t.value === doc.type)?.label} · {(doc.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge variant={cfg.variant}>
                    <Icon size={10} className="mr-1" />{cfg.label}
                  </StatusBadge>
                  <a href={doc.fileUrl} target="_blank" rel="noreferrer"
                    className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground transition-colors">
                    <FileText size={14} />
                  </a>
                  {doc.status !== "approved" && (
                    <button onClick={() => handleDelete(doc._id)}
                      className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {documents.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No documents uploaded yet</p>
        )}
      </div>
    </div>
  );
}
