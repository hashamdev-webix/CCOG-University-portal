import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  FaCheckCircle, FaFileAlt, FaUpload, FaUserPlus, FaArrowRight,
  FaClock, FaCalendarAlt, FaQuestionCircle, FaGraduationCap
} from "react-icons/fa";

const requirements = [
  { title: "Academic Transcripts", desc: "Official transcripts from your previous institution (Matric / Intermediate / Bachelor)" },
  { title: "CNIC / ID Card", desc: "Clear copy of your National Identity Card or B-Form" },
  { title: "Passport Size Photos", desc: "2 recent passport-size photographs (white background)" },
  { title: "Domicile Certificate", desc: "Provincial domicile certificate for local quota seats" },
  { title: "Character Certificate", desc: "Character certificate from your previous institution" },
  { title: "Migration Certificate", desc: "Required if transferring from another university" },
];

const timeline = [
  { phase: "Application Opens", date: "Jan 1, 2025", status: "done" },
  { phase: "Last Date to Apply", date: "Mar 31, 2025", status: "done" },
  { phase: "Document Verification", date: "Apr 1–15, 2025", status: "current" },
  { phase: "Merit List Published", date: "Apr 20, 2025", status: "upcoming" },
  { phase: "Offer Letters Issued", date: "May 1, 2025", status: "upcoming" },
  { phase: "Classes Begin", date: "Sep 1, 2025", status: "upcoming" },
];

const faqs = [
  { q: "Can I apply to multiple courses?", a: "Yes, you can apply to multiple courses. Each application is processed independently." },
  { q: "Is there an application fee?", a: "Registration on CCOG is completely free. Some institutions may charge a processing fee." },
  { q: "How long does the process take?", a: "Typically 2–4 weeks from submission to offer letter, depending on the institution." },
  { q: "Can I track my application status?", a: "Yes, your student dashboard shows real-time status updates for every application." },
  { q: "What if my documents are rejected?", a: "You will be notified with the reason and given a chance to re-upload corrected documents." },
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "hsl(var(--primary) / 0.82)" }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
              <FaGraduationCap size={12} /> Admissions 2025
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Your Admission<br /><span className="text-yellow-300">Made Simple</span>
            </h1>
            <p className="mt-4 text-base text-white/80 leading-relaxed max-w-lg mx-auto">
              Everything you need to know about applying to CCOG partner institutions — requirements, timelines, and step-by-step guidance.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow-400 text-gray-900 rounded-input font-bold hover:bg-yellow-300 transition-all text-sm shadow-lg">
                Apply Now <FaArrowRight size={13} />
              </Link>
              <Link to="/courses" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 border border-white/30 text-white rounded-input font-semibold hover:bg-white/25 transition-all text-sm">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "hsl(var(--primary) / 0.93)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Apply</h2>
            <p className="mt-2 text-sm text-white/70">Follow these simple steps to complete your application</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: FaUserPlus, step: "01", title: "Create Account", desc: "Register for free with your email and basic details" },
              { icon: FaFileAlt, step: "02", title: "Fill Application", desc: "Complete your personal and academic information" },
              { icon: FaUpload, step: "03", title: "Upload Documents", desc: "Submit all required documents in digital format" },
              { icon: FaCheckCircle, step: "04", title: "Get Offer Letter", desc: "Receive your admission offer upon approval" },
            ].map((s) => (
              <div key={s.step} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-card p-5 relative overflow-hidden">
                <span className="absolute top-3 right-4 text-5xl font-black text-white/10">{s.step}</span>
                <div className="w-11 h-11 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4">
                  <s.icon size={18} className="text-yellow-300" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{s.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "rgba(255,255,255,0.93)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Required Documents</h2>
              <p className="text-sm text-muted-foreground mb-7">Prepare these documents before starting your application</p>
              <div className="space-y-3">
                {requirements.map((r) => (
                  <div key={r.title} className="flex items-start gap-3 p-4 bg-surface border border-border rounded-card">
                    <FaCheckCircle size={16} className="text-success mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Admission Timeline</h2>
              <p className="text-sm text-muted-foreground mb-7">Key dates for the 2025 admission cycle</p>
              <div className="space-y-3">
                {timeline.map((t, i) => (
                  <div key={t.phase} className={`flex items-center gap-4 p-4 rounded-card border ${t.status === "current" ? "bg-primary/5 border-primary/30" : "bg-surface border-border"}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.status === "done" ? "bg-success text-white" : t.status === "current" ? "bg-primary text-white" : "bg-border text-muted-foreground"}`}>
                      {t.status === "done" ? <FaCheckCircle size={14} /> : <FaCalendarAlt size={14} />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${t.status === "current" ? "text-primary" : "text-foreground"}`}>{t.phase}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><FaClock size={10} /> {t.date}</p>
                    </div>
                    {t.status === "current" && (
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">Active</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Got questions? We have answers.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="bg-background border border-border rounded-card p-5">
                <div className="flex items-start gap-3">
                  <FaQuestionCircle size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{f.q}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "hsl(var(--primary) / 0.90)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Apply?</h2>
          <p className="text-white/75 text-sm mb-7">Create your free account and start your application today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-gray-900 rounded-input font-bold hover:bg-yellow-300 transition-all text-sm shadow-lg">
            Start Application <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
