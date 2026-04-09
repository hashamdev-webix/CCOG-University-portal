import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";
import CourseCard from "@/components/courseCard"

interface Course {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: string;
  mode: string;
  duration: string;
  fee: number;
  isFree?: boolean;
  seats?: number;
  status: string;
  thumbnail?: string;
}

const CreativeArtsMediaPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const { data } = await api.get(
        "/courses?category=creative_arts_media"
      );
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching creative courses:", error);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
              Creative Arts & Media
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-7">
              Explore courses in photography, music, beauty, creativity, and media.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 border border-border rounded-2xl bg-card">
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Creative Courses Found
              </h2>
              <p className="text-muted-foreground">
                Courses will appear here once added by admin.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  categoryLabel="Creative Arts & Media"
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreativeArtsMediaPage;