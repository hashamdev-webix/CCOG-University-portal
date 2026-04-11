import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";
import CourseCard from "@/components/courseCard";
const ArtsMediaPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const { data } = await api.get("/courses?category=arts_media");
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching arts courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-black mb-3">Arts and Media</h1>
          <p className="text-muted-foreground mb-8">
            Discover creative courses in design, media, and artistic skills.
          </p>

          {loading ? (
            <p>Loading...</p>
          ): courses.length === 0 ? (
            <div className="text-center py-16 border border-border rounded-2xl bg-card">
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Arts Courses Found
              </h2>
              <p className="text-muted-foreground">
                Courses will appear here once added by admin.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course: any) => (
                <CourseCard key={course._id} course={course} categoryLabel="Arts and Media" />
              ))}
            </div>
            
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArtsMediaPage;