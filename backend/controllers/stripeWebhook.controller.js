import stripe from "../config/stripe.js";
import Payment from "../models/payment.model.js";
import Application from "../models/application.model.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const paymentId = session.metadata?.paymentId;
        if (!paymentId) break;

        const payment = await Payment.findById(paymentId);
        if (!payment) break;

        // idempotent update
        if (payment.paymentStatus !== "paid") {
          payment.paymentStatus = "paid";
          payment.stripeSessionId = session.id || payment.stripeSessionId;
          payment.stripePaymentIntentId =
            session.payment_intent || payment.stripePaymentIntentId;
          payment.stripeCustomerEmail =
            session.customer_details?.email || payment.stripeCustomerEmail;
          payment.paymentMethodType =
            session.payment_method_types?.[0] || "";
          payment.paidAt = new Date();
          await payment.save();

          await Application.findByIdAndUpdate(payment.applicationId, {
            status: "approved",
          });
        }

        break;
      }

      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object;
        const paymentId = session.metadata?.paymentId;

        if (!paymentId) break;

        await Payment.findByIdAndUpdate(paymentId, {
          paymentStatus: "failed",
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent || "",
        });

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;

        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          {
            paymentStatus: "failed",
            stripePaymentIntentId: paymentIntent.id,
          }
        );

        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;

        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: charge.payment_intent },
          {
            paymentStatus: "refunded",
          }
        );

        break;
      }

      default:
        break;
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};