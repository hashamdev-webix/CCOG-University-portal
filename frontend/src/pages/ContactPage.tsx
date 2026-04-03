import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

const contactInfo = [
  { icon: FaEnvelope, label: "Email Us", value: "info@ccog.edu", sub: "We reply within 24 hours" },
  { icon: FaPhone, label: "Call Us", value: "+1 (647) 382-9104", sub: "Mon–Fri, 9AM–6PM" },
  { icon: FaMapMarkerAlt, label: "Visit Us", value: "Toronto, Canada", sub: "CCOG Main Campus" },
  { icon: FaClock, label: "Office Hours", value: "Mon–Fri: 9AM–6PM", sub: "Sat: 10AM–2PM" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await api.post("/contact-messages", form);

      toast.success(res.data?.message || "Message sent successfully");
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to send message"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: "hsl(var(--primary) / 0.85)" }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-white text-center">
          <div className="max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
              <FaGraduationCap size={12} /> Get in Touch
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              We're Here
              <br />
              <span className="text-yellow-300">to Help You</span>
            </h1>
            <p className="mt-4 text-base text-white/80 leading-relaxed">
              Have questions about admissions, courses, or your application? Our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((c) => (
              <div
                key={c.label}
                className="bg-background border border-border rounded-card shadow-soft p-5 text-center hover:shadow-lift transition-shadow"
              >
                <div className="w-11 h-11 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <c.icon size={18} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {c.label}
                </p>
                <p className="text-sm font-bold text-foreground">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Send a Message
              </h2>
              <p className="text-sm text-muted-foreground mb-7">
                Fill out the form and we'll get back to you shortly.
              </p>

              {submitted ? (
                <div className="bg-success/10 border border-success/30 rounded-card p-8 text-center">
                  <FaCheckCircle size={40} className="text-success mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. We'll reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 px-5 py-2 bg-primary text-primary-foreground rounded-input text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ali Hassan"
                        className="w-full mt-1.5 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ali@email.com"
                        className="w-full mt-1.5 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      className="w-full mt-1.5 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select a subject</option>
                      <option>Admission Inquiry</option>
                      <option>Course Information</option>
                      <option>Application Status</option>
                      <option>Document Verification</option>
                      <option>Fee & Payment</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full mt-1.5 px-3 py-2.5 border border-border rounded-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-input text-sm font-bold hover:opacity-90 transition-all disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Visit Our Campus
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Come meet us in person at our main office.
              </p>

              <div className="rounded-card overflow-hidden border border-border shadow-soft mb-6 h-56 sm:h-72 relative">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                  alt="Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                  <div className="bg-white rounded-card px-4 py-2 shadow-lg text-center">
                    <FaMapMarkerAlt size={20} className="text-primary mx-auto mb-1" />
                    <p className="text-xs font-bold text-foreground">CCOG Main Campus</p>
                    <p className="text-xs text-muted-foreground">Toronto, Canada</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Admissions Office", value: "Ground Floor, Block A" },
                  { label: "Student Services", value: "1st Floor, Block B" },
                  { label: "Finance Department", value: "2nd Floor, Block A" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="flex justify-between items-center py-2.5 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">{d.label}</span>
                    <span className="text-sm font-semibold text-foreground">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}