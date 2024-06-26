import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems, email,orderId }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    customerEmail: email,
    successUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/success?payment_id={CHECKOUT_SESSION_ID}&client_reference_id=${orderId}`,
    cancelUrl: process.env.NEXT_PUBLIC_URL,
    clientReferenceId: orderId
  });
}
