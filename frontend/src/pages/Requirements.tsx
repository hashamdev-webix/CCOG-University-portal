import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Requirements() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Admission Requirements</h1>

        <ul className="space-y-4 text-muted-foreground">
          <li>✔ High school or equivalent certificate</li>
          <li>✔ Valid ID / Passport</li>
          <li>✔ Academic transcripts</li>
          <li>✔ English proficiency (if required)</li>
          <li>✔ Completed application form</li>
        </ul>
      </section>

      <Footer />
    </>
  );
}