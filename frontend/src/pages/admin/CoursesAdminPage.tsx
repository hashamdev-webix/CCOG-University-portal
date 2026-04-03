import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Clock, Users, Tag } from "lucide-react";
import api from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: "business" | "technology" | "short";
  mode: "online" | "offline";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  isFree: boolean;
  fee: number;
  seats: number;
  certification?: string;
  eligibility: string[];
  learningPoints: string[];
  practicalLearning: string[];
  outcomes: string[];
  careerOpportunities: string[];
  furtherLearning: string[];
  status: "active" | "inactive";
  thumbnail: string;
}

type CourseForm = {
  title: string;
  shortDescription: string;
  description: string;
  category: "business" | "technology" | "short";
  mode: "online" | "offline";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  isFree: boolean;
  fee: string;
  seats: string;
  certification: string;
  eligibility: string;
  learningPoints: string;
  practicalLearning: string;
  outcomes: string;
  careerOpportunities: string;
  furtherLearning: string;
  status: "active" | "inactive";
};

const emptyForm: CourseForm = {
  title: "",
  shortDescription: "",
  description: "",
  category: "business",
  mode: "online",
  level: "beginner",
  duration: "",
  isFree: false,
  fee: "",
  seats: "",
  certification: "",
  eligibility: "",
  learningPoints: "",
  practicalLearning: "",
  outcomes: "",
  careerOpportunities: "",
  furtherLearning: "",
  status: "active",
};

const gradientColors = [
  "from-primary to-accent",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-cyan-500 to-blue-500",
];

const arrayToTextarea = (arr?: string[]) => (Array.isArray(arr) ? arr.join("\n") : "");

const textareaToArray = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function CoursesAdminPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseForm>(emptyForm);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = () => {
    setLoading(true);
    api
      .get("/courses")
      .then((res) => setCourses(res.data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openAdd = () => {
    setEditCourse(null);
    setForm(emptyForm);
    setThumbnail(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (c: Course) => {
    setEditCourse(c);
    setForm({
      title: c.title || "",
      shortDescription: c.shortDescription || "",
      description: c.description || "",
      category: c.category || "business",
      mode: c.mode || "online",
      level: c.level || "beginner",
      duration: c.duration || "",
      isFree: c.isFree ?? false,
      fee: c.isFree ? "" : String(c.fee ?? ""),
      seats: String(c.seats ?? ""),
      certification: c.certification || "",
      eligibility: arrayToTextarea(c.eligibility),
      learningPoints: arrayToTextarea(c.learningPoints),
      practicalLearning: arrayToTextarea(c.practicalLearning),
      outcomes: arrayToTextarea(c.outcomes),
      careerOpportunities: arrayToTextarea(c.careerOpportunities),
      furtherLearning: arrayToTextarea(c.furtherLearning),
      status: c.status || "active",
    });
    setThumbnail(null);
    setError("");
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;

    try {
      await api.delete(`/courses/admin/${id}`);
      fetchCourses();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete course");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("shortDescription", form.shortDescription);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("mode", form.mode);
      fd.append("level", form.level);
      fd.append("duration", form.duration);
      fd.append("isFree", String(form.isFree));
      fd.append("seats", form.seats);
      fd.append("certification", form.certification);
      fd.append("status", form.status);

      if (!form.isFree) {
        fd.append("fee", form.fee);
      }

      fd.append("eligibility", JSON.stringify(textareaToArray(form.eligibility)));
      fd.append("learningPoints", JSON.stringify(textareaToArray(form.learningPoints)));
      fd.append("practicalLearning", JSON.stringify(textareaToArray(form.practicalLearning)));
      fd.append("outcomes", JSON.stringify(textareaToArray(form.outcomes)));
      fd.append("careerOpportunities", JSON.stringify(textareaToArray(form.careerOpportunities)));
      fd.append("furtherLearning", JSON.stringify(textareaToArray(form.furtherLearning)));

      if (thumbnail) {
        fd.append("thumbnail", thumbnail);
      }

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

  const getPriceLabel = (course: Course) => {
    return course.isFree ? "Free" : `PKR ${course.fee?.toLocaleString()}`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Courses</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {courses.length} programs available
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex border border-border rounded-input overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1.5 text-xs transition-colors ${
                view === "grid"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-xs transition-colors ${
                view === "list"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              List
            </button>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all"
          >
            <Plus size={14} /> Add Course
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          Loading...
        </div>
      ) : view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c, idx) => (
            <div
              key={c._id}
              className="bg-background border border-border rounded-card shadow-soft overflow-hidden hover:shadow-lift transition-shadow"
            >
              <div
                className={`h-24 bg-gradient-to-br ${
                  gradientColors[idx % gradientColors.length]
                } flex items-end justify-between p-4`}
              >
                <span className="text-xs font-medium bg-background/20 backdrop-blur-sm text-white px-2 py-1 rounded-sm capitalize">
                  {c.mode}
                </span>

                <span className="text-xs font-medium bg-background/20 backdrop-blur-sm text-white px-2 py-1 rounded-sm capitalize">
                  {c.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">
                    {c.level}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {c.shortDescription || c.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {c.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {c.seats} seats
                  </span>
                </div>

                <p
                  className={`text-sm font-bold mb-1 ${
                    c.isFree ? "text-green-600" : "text-foreground"
                  }`}
                >
                  {getPriceLabel(c)}
                </p>

                {c.certification ? (
                  <p className="text-xs text-muted-foreground mb-4">
                    {c.certification}
                  </p>
                ) : (
                  <div className="mb-4" />
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(c)}
                    className="flex-1 flex items-center justify-center gap-1 text-xs border border-border rounded-input py-1.5 hover:bg-surface transition-colors"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="flex-1 flex items-center justify-center gap-1 text-xs border border-destructive/30 text-destructive rounded-input py-1.5 hover:bg-destructive/5 transition-colors"
                  >
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
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Course
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Mode
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Level
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Duration
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Seats
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Price
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-border hover:bg-surface transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="font-medium text-foreground">{c.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {c.shortDescription || c.description}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground hidden md:table-cell capitalize">
                    {c.category}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground hidden md:table-cell capitalize">
                    {c.mode}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell capitalize">
                    {c.level}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell">
                    {c.duration}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{c.seats}</td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className={c.isFree ? "text-green-600 font-medium" : "text-muted-foreground"}>
                      {getPriceLabel(c)}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-card border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {editCourse ? "Edit Course" : "Add Course"}
            </h2>

            {error && <p className="text-xs text-destructive mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Short Description
                </label>
                <input
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Description
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={5}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as "business" | "technology" | "short",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="short">Short</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Mode
                  </label>
                  <select
                    value={form.mode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        mode: e.target.value as "online" | "offline",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Level
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        level: e.target.value as "beginner" | "intermediate" | "advanced",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Duration
                  </label>
                  <input
                    required
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    placeholder="10-12 Weeks"
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Seats
                  </label>
                  <input
                    required
                    type="number"
                    value={form.seats}
                    onChange={(e) =>
                      setForm({ ...form, seats: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm mt-6">
                    <input
                      type="checkbox"
                      checked={form.isFree}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isFree: e.target.checked,
                          fee: e.target.checked ? "" : form.fee,
                        })
                      }
                    />
                    Free Course
                  </label>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Fee (PKR)
                  </label>
                  <input
                    type="number"
                    value={form.fee}
                    onChange={(e) => setForm({ ...form, fee: e.target.value })}
                    disabled={form.isFree}
                    placeholder={form.isFree ? "Free" : "Enter fee"}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Certification
                </label>
                <input
                  value={form.certification}
                  onChange={(e) =>
                    setForm({ ...form, certification: e.target.value })
                  }
                  placeholder="Certificate of Completion"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Eligibility
                </label>
                <textarea
                  value={form.eligibility}
                  onChange={(e) =>
                    setForm({ ...form, eligibility: e.target.value })
                  }
                  rows={4}
                  placeholder="One point per line"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Learning Points
                </label>
                <textarea
                  value={form.learningPoints}
                  onChange={(e) =>
                    setForm({ ...form, learningPoints: e.target.value })
                  }
                  rows={4}
                  placeholder="One point per line"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Practical Learning
                </label>
                <textarea
                  value={form.practicalLearning}
                  onChange={(e) =>
                    setForm({ ...form, practicalLearning: e.target.value })
                  }
                  rows={4}
                  placeholder="One point per line"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Outcomes
                </label>
                <textarea
                  value={form.outcomes}
                  onChange={(e) =>
                    setForm({ ...form, outcomes: e.target.value })
                  }
                  rows={4}
                  placeholder="One point per line"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Career Opportunities
                </label>
                <textarea
                  value={form.careerOpportunities}
                  onChange={(e) =>
                    setForm({ ...form, careerOpportunities: e.target.value })
                  }
                  rows={4}
                  placeholder="One point per line"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Further Learning
                </label>
                <textarea
                  value={form.furtherLearning}
                  onChange={(e) =>
                    setForm({ ...form, furtherLearning: e.target.value })
                  }
                  rows={4}
                  placeholder="One point per line"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                  className="w-full mt-1 text-sm text-muted-foreground"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-border rounded-input text-sm font-medium hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all disabled:opacity-60"
                >
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