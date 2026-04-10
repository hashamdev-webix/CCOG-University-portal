import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const supportServices = [
  {
    title: "Academic Counseling",
    desc: "Get guidance on course selection, study plans, and academic performance improvement.",
  },
  {
    title: "Career Guidance",
    desc: "Receive expert advice on career paths, internships, and job opportunities.",
  },
  {
    title: "Mental Health Support",
    desc: "Access confidential counseling services to support your mental well-being.",
  },
  {
    title: "Technical Support",
    desc: "Get help with online platforms, course access, and technical issues.",
  },
];

const StudentSupport = () => {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        {/* Hero */}
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Student Support</h1>

        <p className="text-muted-foreground mb-10">
          At CCOG, we are committed to supporting our students at every stage of
          their academic journey. From academic assistance to personal
          well-being, our dedicated support services ensure you succeed both
          inside and outside the classroom.
        </p>

        {/* Support Services */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Our Support Services</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {supportServices.map((service, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Help Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4">Need Additional Help?</h2>

          <p className="text-muted-foreground mb-4">
            Our support team is always available to assist you. Whether you are
            facing academic challenges or need personal guidance, don’t hesitate
            to reach out.
          </p>

          <ul className="space-y-2 text-muted-foreground">
            <li>📧 Email support available 24/7</li>
            <li>📞 Helpline during working hours</li>
            <li>💬 Live chat for quick assistance</li>
            <li>🏫 On-campus support offices</li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-medium text-black">
                How can I contact student support?
              </p>
              <p>
                You can contact us via email, phone, or live chat available on
                your student dashboard.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Are counseling services confidential?
              </p>
              <p>
                Yes, all counseling sessions are completely confidential and
                handled by professionals.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Is support available for online students?
              </p>
              <p>
                Absolutely! All support services are available for both online
                and on-campus students.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Can I get career advice after completing my course?
              </p>
              <p>
                Yes, our career services continue to support you even after
                graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default StudentSupport;