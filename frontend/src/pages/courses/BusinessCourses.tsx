import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaClock, FaLaptop, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import  api  from '@/lib/api';
import { useAuth } from "@/context/AuthContext";

const BusinessCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currency}=useAuth()
  const getBusinessCourses = async () => {
    try {
      const { data } = await api.get(
        "/courses?category=business"
      );
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching technology courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessCourses();
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
              Business Programs
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-7">
              Explore our business-focused courses designed to help students.
            
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 border border-border rounded-2xl bg-card">
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Business Courses Found
              </h2>
              <p className="text-muted-foreground">
                Courses will appear here once added by admin.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-52 w-full overflow-hidden bg-muted">
                    <img
                      src={
                        course.thumbnail ||
                        "https://via.placeholder.com/600x400?text=Course+Image"
                      }
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {course.category}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {course.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {course.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-6 mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <FaClock className="text-primary" />
                        <span>
                          <strong>Duration:</strong> {course.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <FaLaptop className="text-primary" />
                        <span>
                          <strong>Mode:</strong> {course.mode}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <FaMoneyBillWave className="text-primary" />
                        <span>
                          <strong>Fee:</strong> {currency} {course.fee}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/courses/details/${course._id}`}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
                    >
                      Learn More
                      <FaArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BusinessCourses;