import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Course {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: "business" | "technology" | "short";
  mode: "online" | "offline";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  isFree: boolean;
  fee: number;
  seats: number;
  certification?: string;
  eligibility?: string[];
  learningPoints?: string[];
  practicalLearning?: string[];
  outcomes?: string[];
  careerOpportunities?: string[];
  furtherLearning?: string[];
  status: "active" | "inactive";
  thumbnail?: string;
}

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
const {currency}=useAuth()
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

  const priceLabel =
    course?.isFree ? "Free" : `${currency} ${course?.fee?.toLocaleString() || 0}`;

  const renderList = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
        <ul className="space-y-3 text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3 leading-7">
              <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleApplyNow = async () => {
    if (!course?._id) return;

    try {
      setApplying(true);

      // 1) Create application
      const applicationRes = await api.post("/applications/create", {
        courseId: course._id,
      });

      const application = applicationRes?.data?.application;

      if (!application?._id) {
        throw new Error("Application was created but application ID is missing");
      }

      // 2) If paid course -> create stripe session and redirect
      if (!course.isFree && Number(course.fee) > 0) {
        const paymentRes = await api.post("/payments/checkout-session", {
          applicationId: application._id,
        });

        const checkoutUrl = paymentRes?.data?.url;

        if (!checkoutUrl) {
          throw new Error("Checkout session created but Stripe URL is missing");
        }

        window.location.href = checkoutUrl;
        return;
      }

      // 3) If free course -> just redirect or show success
      alert("Application submitted successfully.");
      navigate("/student/my-applications");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
      alert(message);

      // optional: if not logged in and your API returns 401
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-background py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-lg text-muted-foreground">
              Loading course details...
            </p>
          ) : !course ? (
            <p className="text-center text-lg text-muted-foreground">
              Course not found.
            </p>
          ) : (
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="h-72 md:h-96 w-full bg-muted">
                  <img
                    src={
                      course.thumbnail ||
                      "https://via.placeholder.com/1200x600?text=Course+Image"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
                      {course.category}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground capitalize">
                      {course.mode}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground capitalize">
                      {course.level}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        course.isFree
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {course.isFree ? "Free Course" : "Paid Course"}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                    {course.title}
                  </h1>

                  {course.shortDescription && (
                    <p className="text-lg text-muted-foreground leading-8 mb-4">
                      {course.shortDescription}
                    </p>
                  )}

                  <p className="text-muted-foreground leading-7 mb-6">
                    {course.description}
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-sm">
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <strong>Mode:</strong> <span className="capitalize">{course.mode}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <strong>Level:</strong> <span className="capitalize">{course.level}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <strong>Duration:</strong> {course.duration}
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <strong>Fee:</strong> {priceLabel}
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <strong>Seats:</strong> {course.seats}
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <strong>Certification:</strong>{" "}
                      {course.certification || "Not specified"}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleApplyNow}
                      disabled={applying}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
                    >
                      {applying
                        ? "Processing..."
                        : course.isFree
                        ? "Apply Now"
                        : `Apply & Pay ${priceLabel}`}
                    </button>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-background text-foreground font-semibold hover:bg-muted transition"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {renderList("Eligibility", course.eligibility)}
                {renderList("What You Will Learn", course.learningPoints)}
                {renderList("Practical Learning", course.practicalLearning)}
                {renderList("Outcomes After Completion", course.outcomes)}
                {renderList("Career Opportunities", course.careerOpportunities)}
                {renderList("Further Learning Opportunities", course.furtherLearning)}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Ready to start this course?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Take the next step toward building your skills and career with{" "}
                  <span className="font-semibold text-foreground">{course.title}</span>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleApplyNow}
                    disabled={applying}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {applying
                      ? "Processing..."
                      : course.isFree
                      ? "Apply Now"
                      : `Apply & Pay ${priceLabel}`}
                  </button>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-background text-foreground font-semibold hover:bg-muted transition"
                  >
                    Ask for Details
                  </Link>
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