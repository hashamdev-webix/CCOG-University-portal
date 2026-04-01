import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function FeesScholarships() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Fees & Scholarships</h1>

        <div className="space-y-6 text-muted-foreground">
          <p>💰 Tuition fees vary depending on course and duration.</p>
          <p>🎓 Scholarships available for high-achieving students.</p>
          <p>📉 Flexible payment plans available.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}