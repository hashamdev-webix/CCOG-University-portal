import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function CampusLife() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Campus Life</h1>
        <p className="text-muted-foreground">
          Experience a vibrant campus environment with modern facilities,
          student communities, and collaborative learning spaces.
        </p>
      </section>

      <Footer />
    </>
  );
}