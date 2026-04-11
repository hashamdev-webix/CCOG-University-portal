import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";
import CourseCard from "@/components/courseCard";
const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
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
          <h1 className="text-3xl font-black mb-3">All Courses</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course: any) => (
                <CourseCard key={course._id} course={course} categoryLabel="All Courses" />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};
export default AllCoursesPage;