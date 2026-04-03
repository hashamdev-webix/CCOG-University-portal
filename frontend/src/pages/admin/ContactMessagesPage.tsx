import { useEffect, useState } from "react";
import { Eye, Trash2, Mail, Clock, User } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-amber-100 text-amber-700",
  replied: "bg-green-100 text-green-700",
};

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact-messages/admin");
      setMessages(res.data.messages || []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = async (id: string) => {
    try {
      const res = await api.get(`/contact-messages/admin/${id}`);
      setSelectedMessage(res.data.message);
      setShowModal(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load message details");
    }
  };

  const handleStatusChange = async (status: "new" | "read" | "replied") => {
    if (!selectedMessage) return;

    try {
      setUpdatingStatus(true);

      const res = await api.put(`/contact-messages/admin/${selectedMessage._id}/status`, {
        status,
      });

      const updated = res.data.data;

      setSelectedMessage(updated);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === updated._id ? updated : msg))
      );

      toast.success("Message status updated");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this message?");
    if (!ok) return;

    try {
      setDeleting(id);
      await api.delete(`/contact-messages/admin/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));

      if (selectedMessage?._id === id) {
        setShowModal(false);
        setSelectedMessage(null);
      }

      toast.success("Message deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete message");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Contact Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage messages sent from the website contact form
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          Total Messages: <span className="font-semibold text-foreground">{messages.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          Loading...
        </div>
      ) : (
        <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Sender
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Subject
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Date
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className="border-b border-border hover:bg-surface transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{msg.name}</p>
                      <p className="text-xs text-muted-foreground">{msg.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="max-w-xs truncate text-muted-foreground">
                      {msg.subject}
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden lg:table-cell text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        statusColors[msg.status] || "bg-muted text-foreground"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openMessage(msg._id)}
                        className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(msg._id)}
                        disabled={deleting === msg._id}
                        className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {messages.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-muted-foreground"
                  >
                    No contact messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground">Message Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Review and manage this contact message
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMessage(null);
                }}
                className="px-3 py-1.5 border border-border rounded-input text-sm hover:bg-surface"
              >
                Close
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="border border-border rounded-card p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <User size={14} />
                  <span className="text-xs font-medium">Sender</span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {selectedMessage.name}
                </p>
              </div>

              <div className="border border-border rounded-card p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Mail size={14} />
                  <span className="text-xs font-medium">Email</span>
                </div>
                <p className="text-sm font-semibold text-foreground break-all">
                  {selectedMessage.email}
                </p>
              </div>

              <div className="border border-border rounded-card p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Clock size={14} />
                  <span className="text-xs font-medium">Received</span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="border border-border rounded-card p-4">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Status
                </div>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    statusColors[selectedMessage.status] || "bg-muted text-foreground"
                  }`}
                >
                  {selectedMessage.status}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-muted-foreground">
                Subject
              </label>
              <div className="mt-1 p-3 border border-border rounded-card text-sm text-foreground bg-surface/30">
                {selectedMessage.subject}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold text-muted-foreground">
                Message
              </label>
              <div className="mt-1 p-4 border border-border rounded-card text-sm text-foreground bg-surface/30 whitespace-pre-wrap leading-6">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleStatusChange("read")}
                disabled={updatingStatus}
                className="flex-1 py-2 bg-amber-500 text-white rounded-input text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                Mark as Read
              </button>

              <button
                onClick={() => handleStatusChange("replied")}
                disabled={updatingStatus}
                className="flex-1 py-2 bg-green-600 text-white rounded-input text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                Mark as Replied
              </button>

              <button
                onClick={() => handleDelete(selectedMessage._id)}
                disabled={deleting === selectedMessage._id}
                className="flex-1 py-2 border border-destructive/30 text-destructive rounded-input text-sm font-medium hover:bg-destructive/5 disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}