import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, Star } from "lucide-react";
import api from "@/lib/api";

interface Insight {
  _id: string;
  title: string;
  slug: string;
  type: "news" | "article" | "publication";
  shortDescription: string;
  content: string;
  featuredImage: string;
  authorName: string;
  tags: string[];
  isFeatured: boolean;
  status: "draft" | "published";
  publishedAt?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

type InsightForm = {
  title: string;
  slug: string;
  type: "news" | "article" | "publication";
  shortDescription: string;
  content: string;
  authorName: string;
  tags: string;
  isFeatured: boolean;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
};

const emptyForm: InsightForm = {
  title: "",
  slug: "",
  type: "article",
  shortDescription: "",
  content: "",
  authorName: "Admin",
  tags: "",
  isFeatured: false,
  status: "draft",
  seoTitle: "",
  seoDescription: "",
};

const typeColors: Record<string, string> = {
  news: "bg-blue-100 text-blue-700",
  article: "bg-emerald-100 text-emerald-700",
  publication: "bg-violet-100 text-violet-700",
};

export default function Articles() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editInsight, setEditInsight] = useState<Insight | null>(null);
  const [form, setForm] = useState<InsightForm>(emptyForm);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await api.get("/insights/admin/all");
      setInsights(res.data.insights || []);
    } catch (err) {
      console.error(err);
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const openAdd = () => {
    setEditInsight(null);
    setForm(emptyForm);
    setFeaturedImage(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (item: Insight) => {
    setEditInsight(item);
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      type: item.type || "article",
      shortDescription: item.shortDescription || "",
      content: item.content || "",
      authorName: item.authorName || "Admin",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      isFeatured: !!item.isFeatured,
      status: item.status || "draft",
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
    });
    setFeaturedImage(null);
    setError("");
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this content?");
    if (!ok) return;

    try {
      await api.delete(`/insights/admin/${id}`);
      setInsights((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete content");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("type", form.type);
      fd.append("shortDescription", form.shortDescription);
      fd.append("content", form.content);
      fd.append("authorName", form.authorName);
      fd.append(
        "tags",
        JSON.stringify(
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        )
      );
      fd.append("isFeatured", String(form.isFeatured));
      fd.append("status", form.status);
      fd.append("seoTitle", form.seoTitle);
      fd.append("seoDescription", form.seoDescription);

      if (featuredImage) {
        fd.append("featuredImage", featuredImage);
      }

      if (editInsight) {
        await api.put(`/insights/update/${editInsight._id}`, fd);
      } else {
        await api.post("/insights/create", fd);
      }

      setShowModal(false);
      fetchInsights();
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
          <h2 className="text-xl font-bold text-foreground">Insights</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage news, articles, and publications
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-input text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus size={14} />
          Add Insight
        </button>
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
                  Title
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Type
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Author
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Date
                </th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {insights.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-border hover:bg-surface transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      {item.featuredImage ? (
                        <img
                          src={item.featuredImage}
                          alt={item.title}
                          className="w-12 h-12 rounded-md object-cover border border-border shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-muted border border-border shrink-0 flex items-center justify-center">
                          <Eye size={14} className="text-muted-foreground" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">
                            {item.title}
                          </p>
                          {item.isFeatured && (
                            <Star size={14} className="text-yellow-500 fill-yellow-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          /{item.slug}
                        </p>
                        {item.shortDescription && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                            {item.shortDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        typeColors[item.type] || "bg-muted text-foreground"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                    {item.authorName || "Admin"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        item.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 hover:bg-surface rounded-input text-muted-foreground hover:text-foreground"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 hover:bg-destructive/10 rounded-input text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {insights.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-muted-foreground"
                  >
                    No insights found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-card border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {editInsight ? "Edit Insight" : "Add Insight"}
            </h2>

            {error && <p className="text-xs text-destructive mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Title
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Slug
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm({ ...form, slug: e.target.value })
                    }
                    placeholder="auto-generated-if-empty"
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as "news" | "article" | "publication",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="news">News</option>
                    <option value="article">Article</option>
                    <option value="publication">Publication</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Author
                  </label>
                  <input
                    value={form.authorName}
                    onChange={(e) =>
                      setForm({ ...form, authorName: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
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
                        status: e.target.value as "draft" | "published",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) =>
                        setForm({ ...form, isFeatured: e.target.checked })
                      }
                    />
                    Featured
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Short Description
                </label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Content
                </label>
                <textarea
                  required
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={10}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Tags
                </label>
                <input
                  value={form.tags}
                  onChange={(e) =>
                    setForm({ ...form, tags: e.target.value })
                  }
                  placeholder="education, news, research"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFeaturedImage(e.target.files?.[0] || null)
                  }
                  className="w-full mt-1 text-sm text-muted-foreground"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    SEO Title
                  </label>
                  <input
                    value={form.seoTitle}
                    onChange={(e) =>
                      setForm({ ...form, seoTitle: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    SEO Description
                  </label>
                  <input
                    value={form.seoDescription}
                    onChange={(e) =>
                      setForm({ ...form, seoDescription: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
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
                  {saving ? "Saving..." : editInsight ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}