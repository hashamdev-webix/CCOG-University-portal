import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Clock, Users } from "lucide-react";
import api from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  mode: "online" | "offline";
  duration: string;
  fee: number;
  seats: number;
  status: "active" | "inactive";
  thumbnail: string;
}

const emptyForm = { title: "", description: "", mode: "online" as const, duration: "", fee: "", seats: "", status: "active" as const };

const gradientColors = [
  "from-primary to-accent", "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500", "from-rose-500 to-pink-500",
  "from-violet-500 to-purple-500", "from-cyan-500 to-blue-500",
];

export default function CoursesAdminPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = () => {
    setLoading(true);
    api.get("/courses")
      .then((res) => setCourses(res.data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const openAdd = () => {
    setEditCourse(null);
    setForm(emptyForm);
    setThumbnail(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (c: Course) => {
    setEditCourse(c);
    setForm({ title: c.title, description: c.description, mode: c.mode, duration: c.duration, fee: String(c.fee), seats: String(c.seats), status: c.status });
    setThumbnail(null);
    setError("");
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/courses/admin/${id}`);
    fetchCourses();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("mode", form.mode);
      fd.append("duration", form.duration);
      fd.append("fee", form.fee);
      fd.append("seats", form.seats);
      fd.append("status", form.status);
      if (thumbnail) fd.append("thumbnail", thumbnail);

      if (editCourse) {
        await api.put(`/courses/update/${editCourse._id}`, fd);
      } else {
        await api.post("/courses/create", fd);
      }
      setShowModal(false);
      fetchCourses();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Courses</h2>
          <p className="text-sm text-muted-foreground mt-1">{courses.length} programs available</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-border rounded-input overflow-hidden">
            <button onClick={() => setView("grid")} className={`px-3 py-1.5 text-xs transition-colors ${view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-surface"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 text-xs transition-colors ${view === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-surface"}`}>List</button>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all">
            <Plus size={14} /> Add Course
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
      ) : view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c, idx) => (
            <div key={c._id} className="bg-background border border-border rounded-card shadow-soft overflow-hidden hover:shadow-lift transition-shadow">
              <div className={`h-24 bg-gradient-to-br ${gradientColors[idx % gradientColors.length]} flex items-end p-4`}>
                <span className="text-xs font-medium bg-background/20 backdrop-blur-sm text-white px-2 py-1 rounded-sm">{c.mode}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-3">{c.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock size={12} />{c.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{c.seats} seats</span>
                </div>
                <p className="text-sm font-bold text-foreground mb-4">PKR {c.fee?.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> / sem</span></p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(c)} className="flex-1 flex items-center justify-center gap-1 text-xs border border-border rounded-input py-1.5 hover:bg-surface transition-colors">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="flex-1 flex items-center justify-center gap-1 text-xs border border-destructive/30 text-destructive rounded-input py-1.5 hover:bg-destructive/5 transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">Mode</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">Duration</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Seats</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">Fee</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} className="border-b border-border hover:bg-surface transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground">{c.title}</td>
                  <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">{c.mode}</td>
                  <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell">{c.duration}</td>
                  <td className="px-6 py-3 text-muted-foreground">{c.seats}</td>
                  <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">PKR {c.fee?.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(c._id)} className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-card border border-border w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">{editCourse ? "Edit Course" : "Add Course"}</h2>
            {error && <p className="text-xs text-destructive mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Mode</label>
                  <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value as "online" | "offline" })} className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })} className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Duration</label>
                  <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="2 Years" className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Fee (PKR)</label>
                  <input required type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Seats</label>
                  <input required type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Thumbnail</label>
                <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} className="w-full mt-1 text-sm text-muted-foreground" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-border rounded-input text-sm font-medium hover:bg-surface transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all disabled:opacity-60">
                  {saving ? "Saving..." : editCourse ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
