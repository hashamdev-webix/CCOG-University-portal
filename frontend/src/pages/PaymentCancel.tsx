import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-yellow-500 text-5xl mb-4">⚠</div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground mb-6">
            Your payment was not completed. You can try again anytime.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="w-full py-2 border border-border rounded-xl font-medium hover:bg-muted"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PaymentCancel;