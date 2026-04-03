import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";

interface Insight {
  _id: string;
  title: string;
  slug: string;
  type: "news" | "article" | "publication";
  shortDescription?: string;
  content: string;
  featuredImage?: string;
  authorName?: string;
  tags?: string[];
  isFeatured?: boolean;
  publishedAt?: string | null;
  createdAt: string;
}

const typeConfig = {
  news: {
    label: "News",
    badge: "bg-blue-100 text-blue-700",
    backLink: "/news",
  },
  article: {
    label: "Article",
    badge: "bg-emerald-100 text-emerald-700",
    backLink: "/articles",
  },
  publication: {
    label: "Publication",
    badge: "bg-violet-100 text-violet-700",
    backLink: "/publications",
  },
};

export default function InsightDetailsPage() {
  const { slug } = useParams();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const res = await api.get(`/insights/${slug}`);
        setInsight(res.data.insight || null);
      } catch (error) {
        console.error("Error fetching insight:", error);
        setInsight(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchInsight();
    }
  }, [slug]);

  const formatContent = (text: string) => {
    return text.split("\n").filter(Boolean);
  };

  const config = insight ? typeConfig[insight.type] : null;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">
              Loading details...
            </div>
          ) : !insight ? (
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Content not found
              </h1>
              <p className="text-muted-foreground mb-6">
                The requested insight could not be found.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="h-72 md:h-96 w-full bg-muted">
                <img
                  src={
                    insight.featuredImage ||
                    "https://via.placeholder.com/1200x600?text=Insight+Image"
                  }
                  alt={insight.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      config?.badge || "bg-muted text-foreground"
                    }`}
                  >
                    {config?.label || insight.type}
                  </span>

                  {insight.isFeatured && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                      Featured
                    </span>
                  )}

                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      insight.publishedAt || insight.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                  {insight.title}
                </h1>

                {insight.shortDescription && (
                  <p className="text-lg text-muted-foreground leading-8 mb-5">
                    {insight.shortDescription}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <span>
                    By <span className="font-medium text-foreground">{insight.authorName || "Admin"}</span>
                  </span>
                </div>

                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {insight.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prose prose-sm sm:prose-base max-w-none text-foreground">
                  {formatContent(insight.content).map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-8 mb-5"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-4">
                

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}