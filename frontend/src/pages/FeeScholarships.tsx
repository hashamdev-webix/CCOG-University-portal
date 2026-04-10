import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function FeesScholarships() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Fees & Scholarships</h1>

        <p className="text-muted-foreground mb-8">
          We aim to make quality education accessible to everyone. Our fee
          structure is designed to be flexible, and we offer various
          scholarship opportunities to support students based on merit and need.
        </p>

        {/* Fees Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-10">
          <h2 className="text-xl font-semibold mb-4">Tuition Fees</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li>💰 Tuition fees vary depending on the course and duration</li>
            <li>📊 Short courses are generally more affordable</li>
            <li>🎯 Professional programs may have higher fees due to advanced content</li>
            <li>📄 Detailed fee breakdown is available on each course page</li>
          </ul>
        </div>

        {/* Scholarships Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Scholarships</h2>

          <p className="text-muted-foreground mb-4">
            We offer a range of scholarships to recognize academic excellence,
            support talented students, and ensure financial limitations do not
            prevent access to education.
          </p>

          <ul className="space-y-3 text-muted-foreground">
            <li>🎓 Merit-based scholarships for high-performing students</li>
            <li>📉 Need-based financial assistance for eligible applicants</li>
            <li>🌍 Special scholarships for international students</li>
            <li>👩‍💻 Scholarships for technology and skill-based programs</li>
            <li>🏆 Early application discounts and limited-time offers</li>
          </ul>
        </div>

        {/* Payment Plans */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-10">
          <h2 className="text-xl font-semibold mb-4">Flexible Payment Options</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li>💳 Easy installment plans available</li>
            <li>📅 Pay fees in monthly or quarterly installments</li>
            <li>🔒 Secure online payment methods</li>
            <li>🤝 Custom payment plans for selected programs</li>
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
                How can I apply for a scholarship?
              </p>
              <p>
                You can apply during the admission process by selecting the
                scholarship option and submitting required documents.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Are scholarships fully funded?
              </p>
              <p>
                Scholarships may cover partial or full tuition depending on the
                eligibility criteria and program.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Can I pay fees in installments?
              </p>
              <p>
                Yes, we offer flexible installment plans for most courses.
              </p>
            </div>

            <div>
              <p className="font-medium text-black">
                Is there any refund policy?
              </p>
              <p>
                Refund policies vary by course. Please review the terms on the
                course page or contact support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}