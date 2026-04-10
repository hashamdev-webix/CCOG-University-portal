import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Requirements() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Admission Requirements</h1>

        <p className="text-muted-foreground mb-6">
          To ensure a smooth and successful admission process, all applicants must meet the following
          requirements. These criteria help us maintain academic standards and ensure that students are
          well-prepared for their chosen programs.
        </p>

        {/* Requirements List */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">General Requirements</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li>✔ High school certificate or equivalent qualification</li>
            <li>✔ Valid National ID Card / Passport</li>
            <li>✔ Academic transcripts from previous institutions</li>
            <li>✔ English proficiency proof (IELTS/TOEFL if required)</li>
            <li>✔ Completed online application form</li>
            <li>✔ Recent passport-size photographs</li>
            <li>✔ Updated CV (for advanced or professional courses)</li>
          </ul>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

          <p className="text-muted-foreground mb-3">
            Some programs may have additional requirements such as entrance tests, interviews, or
            portfolio submissions. Applicants are advised to check specific course details before applying.
          </p>

          <p className="text-muted-foreground">
            International students may be required to submit visa documentation and proof of financial
            support. Our admissions team is available to guide you through every step of the process.
          </p>
        </div>

        {/* Application Steps */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Application Process</h2>

          <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
            <li>Fill out the online application form</li>
            <li>Upload all required documents</li>
            <li>Pay application or course fee (if applicable)</li>
            <li>Wait for application review</li>
            <li>Receive admission confirmation via email</li>
          </ol>
        </div>

        {/* FAQs */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-medium text-black">Do I need prior experience to apply?</p>
              <p>No, most beginner courses do not require prior experience. However, advanced programs may have prerequisites.</p>
            </div>

            <div>
              <p className="font-medium text-black">Can I apply without English proficiency?</p>
              <p>Yes, for some local programs. However, international or advanced courses may require proof of English proficiency.</p>
            </div>

            <div>
              <p className="font-medium text-black">How long does the admission process take?</p>
              <p>Typically, it takes 3–7 working days after submitting all required documents.</p>
            </div>

            <div>
              <p className="font-medium text-black">Is there an application fee?</p>
              <p>Some courses may require an application or registration fee. Please check the course details page.</p>
            </div>

            <div>
              <p className="font-medium text-black">Can I edit my application after submission?</p>
              <p>You may contact the admissions office to request changes before final approval.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}