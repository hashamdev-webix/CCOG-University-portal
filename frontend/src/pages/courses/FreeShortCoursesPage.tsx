import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";
import CourseCard from "@/components/courseCard";
import { FaBolt, FaCertificate, FaClock, FaGift } from "react-icons/fa";

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

const FreeShortCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const { data } = await api.get("/courses?category=free_short_courses");
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching free/short courses:", error);
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
          {/* Top Hero Content */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 sm:p-10 lg:p-14 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
                <FaGift size={12} />
                Learn More in Less Time
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
                Free & Short Courses to
                <span className="text-primary"> Build Skills Fast</span>
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base leading-7 mb-6">
                Discover flexible, practical, and career-focused courses designed
                for students, professionals, and beginners who want to learn
                quickly and start applying their skills immediately. These
                programs are ideal for personal growth, career development, and
                hands-on learning without a long-term commitment.
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <FaBolt size={14} />
                    <span className="text-sm font-semibold">Quick Learning</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-6">
                    Short-duration courses designed for fast and practical skill building.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <FaClock size={14} />
                    <span className="text-sm font-semibold">Flexible Duration</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-6">
                    Perfect for learners who want to upskill without long academic timelines.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <FaCertificate size={14} />
                    <span className="text-sm font-semibold">Practical Value</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-6">
                    Gain useful knowledge that can support jobs, freelancing, and career growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Intro */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
              Explore Our Free & Short Courses
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-7">
              Browse short, practical, and beginner-friendly programs created to
              help learners gain valuable skills in a short time.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 border border-border rounded-2xl bg-card">
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Free & Short Courses Found
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
                  categoryLabel="Free & Short Courses"
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

export default FreeShortCoursesPage;