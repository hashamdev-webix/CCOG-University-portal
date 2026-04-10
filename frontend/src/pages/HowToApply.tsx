import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const steps = [
  {
    title: "Create Account",
    desc: "Register your student account using a valid email address. This account will allow you to track your application, upload documents, and receive updates.",
  },
  {
    title: "Choose Course",
    desc: "Explore our wide range of programs and select the course that aligns with your academic background and career goals.",
  },
  {
    title: "Fill Application Form",
    desc: "Complete the online application form by providing accurate personal, academic, and contact details.",
  },
  {
    title: "Upload Documents",
    desc: "Upload all required documents including academic transcripts, identification, and any additional supporting materials.",
  },
  {
    title: "Application Review",
    desc: "Our admissions team will carefully review your application and verify the submitted documents.",
  },
  {
    title: "Pay Fees",
    desc: "If applicable, pay the course or registration fee securely through our online payment system.",
  },
  {
    title: "Receive Offer Letter",
    desc: "Once approved, you will receive your official admission offer letter via email.",
  },
  {
    title: "Start Your Journey",
    desc: "Enroll in your course and begin your learning experience with CCOG.",
  },
];

export default function HowToApply() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">How to Apply</h1>

        <p className="text-muted-foreground mb-8">
          Applying to CCOG is simple and straightforward. Follow the step-by-step
          process below to complete your admission successfully and start your
          academic journey with us.
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2">
                Step {i + 1}: {step.title}
              </h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4">Application Timeline</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li>✔ Application submission: 10–15 minutes</li>
            <li>✔ Document verification: 2–5 working days</li>
            <li>✔ Admission decision: 3–7 working days</li>
            <li>✔ Course start: As per selected schedule</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
          <h2 className="text-xl font-semibold mb-4">Helpful Tips</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li>✔ Ensure all documents are clear and readable before uploading</li>
            <li>✔ Double-check your email and contact details</li>
            <li>✔ Apply early to secure your seat in high-demand courses</li>
            <li>✔ Keep a copy of your submitted application for reference</li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-medium text-black">
                Can I apply for multiple courses?
              </p>
              <p>
                Yes, you can apply for multiple courses, but each application
                must be submitted separately.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                What happens if my application is rejected?
              </p>
              <p>
                You will be notified with the reason, and you may reapply after
                meeting the requirements.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                How will I know my application status?
              </p>
              <p>
                You can track your application status through your student
                dashboard or via email notifications.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Is online application mandatory?
              </p>
              <p>
                Yes, all applications must be submitted through our online
                system for proper tracking and processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}