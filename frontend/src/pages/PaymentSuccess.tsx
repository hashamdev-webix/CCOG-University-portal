import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-green-600 text-5xl mb-4">✔</div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Payment Successful 🎉
          </h1>

          <p className="text-muted-foreground mb-6">
            Your payment has been completed successfully. You are now enrolled in the course.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/dashboard/application")}
              className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2 border border-border rounded-xl font-medium hover:bg-muted transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PaymentSuccess;