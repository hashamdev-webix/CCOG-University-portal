import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PublicationsPage = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Publications</h1>
        <p className="text-muted-foreground">
          Explore official publications and academic materials.
        </p>
      </section>
      <Footer />
    </>
  );
};

export default PublicationsPage;