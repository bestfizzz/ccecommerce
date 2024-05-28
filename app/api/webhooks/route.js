import Stripe from "stripe";
import { orderCollectionAdmin } from "@/libs/firebase-admin";
const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: '2023-10-16',
});

export async function POST(request) {
    const stripeSignature = request.headers.get('stripe-signature');
    const rawBody = await request.text();

    let event = stripe.webhooks.constructEvent(rawBody, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
        const orderid = event.data.object.client_reference_id;
        const checkoutid = event.data.object.id;
        // Then define and call a function to handle the event checkout.session.completed
        await orderCollectionAdmin.doc(orderid).update({transactionID: checkoutid})
        // ... handle other event types
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }
    return Response.json({ status: 200 })
}