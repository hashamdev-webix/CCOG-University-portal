import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaGraduationCap, FaBullseye, FaEye, FaUsers, FaAward, FaBookOpen, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const stats = [
  { value: "12,000+", label: "Students Enrolled" },
  { value: "200+", label: "Courses Offered" },
  { value: "50+", label: "Partner Colleges" },
  { value: "15+", label: "Years of Excellence" },
];

const team = [
  { name: "Dr. Ahmed Raza", role: "Vice Chancellor", initial: "A" },
  { name: "Prof. Sara Khan", role: "Dean of Admissions", initial: "S" },
  { name: "Dr. Usman Ali", role: "Head of Academics", initial: "U" },
  { name: "Ms. Fatima Malik", role: "Student Affairs", initial: "F" },
];

const values = [
  { icon: FaBullseye, title: "Our Mission", desc: "To provide accessible, quality education by simplifying the admission process for every student across Pakistan." },
  { icon: FaEye, title: "Our Vision", desc: "To become the leading digital gateway connecting students with top educational institutions nationwide." },
  { icon: FaAward, title: "Our Values", desc: "Integrity, transparency, and student-first approach guide every decision we make at CCOG." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-5">
            <FaGraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">About CCOG</h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            CCOG is Pakistan's premier online college admission portal, connecting thousands of students with their dream institutions since 2010.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">{s.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">What Drives Us</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">The principles behind everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: FaBullseye,
                title: "Our Mission",
                desc: "To provide accessible, quality education by simplifying the admission process for every student across Pakistan.",
                img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
              },
              {
                icon: FaEye,
                title: "Our Vision",
                desc: "To become the leading digital gateway connecting students with top educational institutions nationwide.",
                img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
              },
              {
                icon: FaAward,
                title: "Our Values",
                desc: "Integrity, transparency, and student-first approach guide every decision we make at CCOG.",
                img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80",
              },
            ].map((v) => (
              <div key={v.title} className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover" style={{ display: "block" }} />
                  <div className="absolute inset-0" style={{ backgroundColor: "hsl(var(--primary) / 0.78)" }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <v.icon size={22} className="text-yellow-300" />
                    </div>
                    <h3 className="font-extrabold text-white text-lg drop-shadow">{v.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Our Story</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Founded in 2010, CCOG started with a simple idea — make college admissions less stressful. What began as a small portal for a handful of colleges in Islamabad has grown into a nationwide platform serving over 50 partner institutions.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                We saw students struggling with paperwork, long queues, and confusing processes. So we built a system that puts everything online — from application to offer letter — in one seamless experience.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                Today, CCOG processes thousands of applications every year, helping students from all corners of Pakistan access quality education without the hassle.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: FaBookOpen, label: "Programs Available", value: "200+" },
                  { icon: FaUsers, label: "Active Students", value: "12K+" },
                  { icon: FaAward, label: "Partner Colleges", value: "50+" },
                  { icon: FaGraduationCap, label: "Graduates", value: "8K+" },
                ].map((item) => (
                  <div key={item.label} className="bg-background border border-border rounded-card p-4 sm:p-5 text-center shadow-soft">
                    <item.icon size={20} className="text-primary mx-auto mb-2" />
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-card overflow-hidden shadow-lift" style={{ minHeight: "420px" }}>
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
                alt="Our Story"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
              <div className="absolute inset-0" style={{ backgroundColor: "hsl(var(--primary) / 0.35)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-card px-4 py-3 text-white">
                  <p className="text-xs font-semibold text-yellow-300 mb-0.5">Est. 2010</p>
                  <p className="text-sm font-bold">Pakistan's Premier Admission Portal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Meet the Team</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">The people dedicated to your success</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-background border border-border rounded-card shadow-soft p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-primary text-xl sm:text-2xl font-bold">{member.initial}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">{member.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "hsl(var(--primary) / 0.88)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-white/70 text-sm sm:text-base mb-8">Have questions? We're here to help.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: FaEnvelope, label: "Email", value: "info@ccog.edu" },
              { icon: FaPhone, label: "Phone", value: "+1 (647) 382-9104" },
              { icon: FaMapMarkerAlt, label: "Address", value: "Toronto, Canada" },
            ].map((c) => (
              <div key={c.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-card p-5 hover:bg-white/15 transition-colors">
                <div className="w-10 h-10 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center mb-3">
                  <c.icon size={16} className="text-yellow-300" />
                </div>
                <p className="text-xs text-white/60 uppercase tracking-wider mb-1">{c.label}</p>
                <p className="text-sm font-semibold text-white">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
