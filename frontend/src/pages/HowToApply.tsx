import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const steps = [
  {
    title: "Create Account",
    desc: "Register your student account to begin your admission process.",
  },
  {
    title: "Choose Course",
    desc: "Browse programs and select the course that fits your career goals.",
  },
  {
    title: "Upload Documents",
    desc: "Submit required academic and personal documents securely.",
  },
  {
    title: "Get Offer Letter",
    desc: "Receive your admission offer after successful verification.",
  },
];

export default function HowToApply() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">How to Apply</h1>
        <p className="text-muted-foreground mb-8">
          Follow these simple steps to apply for your desired course at CCOG.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="p-5 border rounded-xl bg-card">
              <h3 className="font-bold text-lg mb-2">
                Step {i + 1}: {step.title}
              </h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}