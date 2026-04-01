import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const news = [
  "New AI Program Launched",
  "Partnership with European Universities",
  "Campus Expansion Project Announced",
];

export default function NewsPage() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>

        {news.map((n, i) => (
          <div key={i} className="p-4 border rounded-lg mb-4">
            {n}
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}