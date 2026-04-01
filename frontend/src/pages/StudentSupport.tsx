import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const StudentSupport = () => {
  return (
    <>
      <Navbar />
        <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Student Support</h1>

        <p className="text-muted-foreground">
          We provide academic counseling, career guidance, and mental health
          support to ensure student success.
        </p>
      </section>
      <Footer />
    </>
  );
};

export default StudentSupport;