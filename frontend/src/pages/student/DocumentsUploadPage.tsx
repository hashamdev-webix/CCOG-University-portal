import { useState, useEffect, useMemo } from "react";
import {
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Trash2,
  Eye,
  FolderOpen,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

interface DocumentItem {
  _id: string;
  type: string;
  originalName: string;
  fileUrl: string;
  size: number;
  format?: string;
  status: "pending" | "approved" | "rejected";
  remarks?: string;
  createdAt?: string;
}

interface Application {
  _id: string;
  applicationNumber: string;
  status: string;
  createdAt?: string;
  courseId: {
    _id?: string;
    title: string;
    duration?: string;
    fee?: number;
    mode?: string;
    isFree?: boolean;
  };
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

const applicationStatusVariantMap: Record<
  string,
  "warning" | "success" | "danger" | "info"
> = {
  submitted: "warning",
  under_review: "info",
  documents_pending: "info",
  approved: "success",
  rejected: "danger",
  offer_generated: "success",
};

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 KB";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatDocType = (type: string) =>
  docTypes.find((t) => t.value === type)?.label || type;

export default function DocumentsUploadPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [docsLoading, setDocsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState("id_card");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedApplication = useMemo(
    () => applications.find((a) => a._id === selectedAppId) || null,
    [applications, selectedAppId]
  );

  const uploadedTypes = useMemo(() => documents.map((d) => d.type), [documents]);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/my-applications");
      const apps = res.data.applications || [];
      setApplications(apps);

      if (apps.length > 0) {
        setSelectedAppId((prev) => prev || apps[0]._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async (applicationId: string) => {
    if (!applicationId) return;

    try {
      setDocsLoading(true);
      const res = await api.get(`/documents/my/${applicationId}`);
      setDocuments(res.data.documents || []);
    } catch (err) {
      console.error(err);
      setDocuments([]);
    } finally {
      setDocsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedAppId) {
      fetchDocuments(selectedAppId);
    }
  }, [selectedAppId]);

  const handleUpload = async (file: File) => {
    if (!selectedAppId) return;

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be 5MB or less");
      }

      const allowedMimeTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (!allowedMimeTypes.includes(file.type)) {
        throw new Error("Only PDF, JPG, and PNG files are allowed");
      }

      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", selectedType);

      await api.post(`/documents/upload/${selectedAppId}`, fd);

      setSuccess("Document uploaded successfully.");
      await fetchDocuments(selectedAppId);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError("");
      setSuccess("");
      await api.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
      setSuccess("Document deleted successfully.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete document");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="max-w-3xl text-center py-16">
        <div className="bg-background border border-border rounded-card shadow-soft p-8">
          <FolderOpen className="mx-auto mb-4 text-muted-foreground" size={32} />
          <p className="text-foreground font-medium mb-2">No applications found</p>
          <p className="text-muted-foreground text-sm">
            Please submit a course application first. After that, you can upload
            your required documents here.
          </p>
        </div>
      </div>
    );
  }

  const uploaded = documents.length;
  const total = docTypes.length;

  return (
    <div className="max-w-4xl">
      {/* Application Selector */}
      <div className="bg-background border border-border rounded-card shadow-soft p-5 mb-6">
        <label className="text-xs font-semibold text-muted-foreground">
          Select Application
        </label>

        <select
          value={selectedAppId}
          onChange={(e) => {
            setSelectedAppId(e.target.value);
            setSuccess("");
            setError("");
          }}
          className="w-full mt-2 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {applications.map((a) => (
            <option key={a._id} value={a._id}>
              {a.applicationNumber} — {a.courseId?.title}
            </option>
          ))}
        </select>

        {selectedApplication && (
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div className="border border-border rounded-card p-4 bg-surface/30">
              <p className="text-xs text-muted-foreground mb-1">Course</p>
              <p className="text-sm font-semibold text-foreground">
                {selectedApplication.courseId?.title}
              </p>
            </div>

            <div className="border border-border rounded-card p-4 bg-surface/30">
              <p className="text-xs text-muted-foreground mb-1">Application ID</p>
              <p className="text-sm font-semibold text-foreground">
                {selectedApplication.applicationNumber}
              </p>
            </div>

            <div className="border border-border rounded-card p-4 bg-surface/30">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="mt-1">
                <StatusBadge
                  variant={
                    applicationStatusVariantMap[selectedApplication.status] || "info"
                  }
                >
                  {selectedApplication.status.replace(/_/g, " ")}
                </StatusBadge>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="bg-background border border-border rounded-card shadow-soft p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Documents Uploaded</p>
          <p className="text-sm font-bold text-foreground">
            {uploaded} / {total}
          </p>
        </div>

        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(uploaded / total) * 100}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Upload the required documents for the selected application. Approved
          documents cannot be deleted by students.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-background border border-border rounded-card shadow-soft p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4">Upload Document</h2>

        {error && <p className="text-xs text-destructive mb-3">{error}</p>}
        {success && <p className="text-xs text-green-600 mb-3">{success}</p>}

        <div className="grid sm:grid-cols-[1fr_auto] gap-3 mb-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {docTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
                {uploadedTypes.includes(t.value) ? " (uploaded)" : ""}
              </option>
            ))}
          </select>

          <label
            className={`cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all ${
              uploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Choose File"}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleUpload(e.target.files[0]);
                  e.currentTarget.value = "";
                }
              }}
            />
          </label>
        </div>

        <p className="text-xs text-muted-foreground">
          Allowed files: PDF, JPG, JPEG, PNG · Maximum size: 5MB
        </p>
      </div>

      {/* Uploaded Documents */}
      <div className="bg-background border border-border rounded-card shadow-soft p-5">
        <h2 className="font-semibold text-foreground mb-4">My Documents</h2>

        {docsLoading ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            Loading documents...
          </p>
        ) : documents.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => {
              const cfg = statusConfig[doc.status] || statusConfig.pending;
              const Icon = cfg.icon;

              return (
                <div
                  key={doc._id}
                  className="bg-background border border-border rounded-card p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-input bg-accent/10 flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-accent" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {doc.originalName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDocType(doc.type)} · {formatBytes(doc.size)}
                          {doc.format ? ` · ${doc.format.toUpperCase()}` : ""}
                        </p>
                        {doc.remarks ? (
                          <p className="text-xs text-muted-foreground mt-1">
                            Remarks: {doc.remarks}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge variant={cfg.variant}>
                        <Icon size={10} className="mr-1" />
                        {cfg.label}
                      </StatusBadge>

                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground transition-colors"
                        title="View document"
                      >
                        <Eye size={15} />
                      </a>

                      {doc.status !== "approved" && (
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-2 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive transition-colors"
                          title="Delete document"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}