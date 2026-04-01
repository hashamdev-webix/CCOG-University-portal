import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  FaUserPlus, FaBookOpen, FaUpload, FaFileAlt, FaClock, FaStar,
  FaGraduationCap, FaDesktop, FaUsers, FaCheckCircle, FaArrowRight,
  FaUniversity, FaAward, FaShieldAlt,
  FaLaptop,
  FaMoneyBillWave
} from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "@/lib/api";
const stats = [
  { value: "12,000+", label: "Students Enrolled" },
  { value: "200+", label: "Courses Offered" },
  { value: "50+", label: "Partner Colleges" },
  { value: "98%", label: "Satisfaction Rate" },
];

const steps = [
  { icon: FaUserPlus, title: "Register Account", desc: "Create your free student account in minutes" },
  { icon: FaBookOpen, title: "Choose Course", desc: "Browse and select your desired program" },
  { icon: FaUpload, title: "Upload Documents", desc: "Submit required documents securely online" },
  { icon: FaFileAlt, title: "Get Offer Letter", desc: "Receive your admission offer digitally" },
];



const testimonials = [
  { quote: "CCOG made my admission process so easy. I applied online and got my offer letter within a week!", name: "Sarah Ahmed", course: "BS Computer Science" },
  { quote: "The platform is intuitive and the support team is incredibly helpful. Highly recommended!", name: "Usman Ali", course: "MBA Business" },
  { quote: "I tracked my entire application journey through CCOG. Best experience ever!", name: "Fatima Khan", course: "BS Engineering" },
];

const features = [
  { icon: FaShieldAlt, title: "Secure & Trusted", desc: "Your data is protected with enterprise-grade security" },
  { icon: FaDesktop, title: "100% Online", desc: "Apply from anywhere, anytime — no campus visit needed" },
  { icon: FaCheckCircle, title: "Real-Time Tracking", desc: "Track your application status at every step" },
  { icon: FaAward, title: "Instant Offer Letter", desc: "Receive your digital offer letter upon approval" },
];
interface Course {
  _id: string;
  title: string;
  description: string;
  status:string,
  duration: string;
  mode: string;
  seats: number;
  fee: number;
  image: string;
  thumbnail: string;
  category: string;
}

export default function LandingPage() {
const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
console.log(api);

   const getCourses = async () => {
    try {
      const { data } = await api.get(
        "/courses"
      );
      console.log("data",data);
      
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching  courses:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("courses",courses);
  
  useEffect(()=>{
    getCourses()
  },[])
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                <FaUniversity size={12} /> Pakistan's #1 Admission Portal
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Your Future<br />
                <span className="text-yellow-300">Starts Here</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80 max-w-lg leading-relaxed">
                Apply for courses online, track your admission, and receive your offer letter — all in one place.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/register" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow-400 text-gray-900 rounded-input font-bold hover:bg-yellow-300 transition-all text-sm shadow-lg">
                  Apply Now <FaArrowRight size={13} />
                </Link>
                <Link to="/courses" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-input font-semibold hover:bg-white/25 transition-all text-sm">
                  Browse Courses
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
                {["Free Registration", "No Hidden Fees", "24/7 Support"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <FaCheckCircle size={12} className="text-yellow-300" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <FaGraduationCap size={20} className="text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">CCOG University Portal</p>
                    <p className="text-xs text-white/60">Admissions Open — Fall 2025</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Applications", value: "3,240+", icon: FaFileAlt },
                    { label: "Courses", value: "200+", icon: FaBookOpen },
                    { label: "Online Classes", value: "500+", icon: FaDesktop },
                    { label: "Students", value: "12K+", icon: FaUsers },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 rounded-xl p-3 border border-white/10">
                      <s.icon size={14} className="text-yellow-300 mb-1.5" />
                      <p className="text-xl font-bold tabular-nums">{s.value}</p>
                      <p className="text-xs text-white/60">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-400/20 border border-green-400/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs font-semibold text-green-300">Admissions Open — Fall 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "hsl(var(--primary) / 0.92)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold tabular-nums text-yellow-300">{s.value}</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Why Choose CCOG?</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">Everything you need for a smooth admission journey</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-background border border-border rounded-card shadow-soft p-5 text-center hover:shadow-lift transition-shadow">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Admission in 4 Simple Steps</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">From registration to your offer letter</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] border-t-2 border-dashed border-border" />
            {steps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4 relative z-10 shadow-lg">
                  <step.icon size={20} className="text-white" />
                </div>
                <p className="text-xs font-bold text-primary mb-1">Step {i + 1}</p>
                <h3 className="font-bold text-foreground text-xs sm:text-sm md:text-base">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-14 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Popular Courses</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">Explore our most sought-after programs</p>
            </div>
            {/* <Link to="/courses" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View All <FaArrowRight size={12} />
            </Link> */}
          </div>
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
                                    <strong>Fee:</strong> Rs. {course.fee}
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
          <div className="text-center mt-6 sm:hidden">
            <Link to="/courses" className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-1">
              View All Courses <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-primary/85 z-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 text-sm sm:text-base mb-8">Join thousands of students who have already secured their admission through CCOG.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-yellow-400 text-gray-900 rounded-input font-bold hover:bg-yellow-300 transition-all text-sm shadow-lg">
              Get Started Free <FaArrowRight size={13} />
            </Link>
            <Link to="/admissions" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/15 border border-white/30 text-white rounded-input font-semibold hover:bg-white/25 transition-all text-sm">
              Learn About Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">What Students Say</h2>
            <p className="mt-3 text-sm text-muted-foreground">Real stories from real students</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background border border-border rounded-card shadow-soft p-5 sm:p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={12} className="text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
