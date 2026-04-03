import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
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
  isFeatured?: boolean;
  publishedAt?: string | null;
  createdAt: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/insights?type=news");
        setNews(res.data.insights || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Latest News
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Stay updated with the latest announcements, developments, and
            college news from CCOG Business and Tech College.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading news...
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No news available right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="h-52 bg-muted">
                  <img
                    src={
                      item.featuredImage ||
                      "https://via.placeholder.com/800x500?text=News+Image"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      News
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-6 line-clamp-3 mb-4">
                    {item.shortDescription || item.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      By {item.authorName || "Admin"}
                    </span>

                    <Link
                      to={`/insights/${item.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}