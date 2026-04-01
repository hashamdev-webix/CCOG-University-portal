import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCourseDetails = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [id]);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-lg text-muted-foreground">
              Loading course details...
            </p>
          ) : !course ? (
            <p className="text-center text-lg text-muted-foreground">
              Course not found.
            </p>
          ) : (
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="h-72 w-full bg-muted">
                <img
                  src={
                    course.thumbnail ||
                    "https://via.placeholder.com/1000x500?text=Course+Image"
                  }
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
                  {course.category}
                </span>

                <h1 className="text-3xl font-black text-foreground mb-4">
                  {course.title}
                </h1>

                <p className="text-muted-foreground leading-7 mb-6">
                  {course.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <strong>Mode:</strong> {course.mode}
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <strong>Duration:</strong> {course.duration}
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <strong>Fee:</strong> Rs. {course.fee}
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <strong>Seats:</strong> {course.seats}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CourseDetails;