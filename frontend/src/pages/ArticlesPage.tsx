import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function ArticlesPage() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Articles</h1>

        <p className="text-muted-foreground">
          Explore academic insights, research discussions, and expert articles
          from our faculty.
        </p>
      </section>

      <Footer />
    </>
  );
}