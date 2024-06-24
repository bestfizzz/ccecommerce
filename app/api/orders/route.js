import sanitize from "@/components/sanatize";
import { postOrder, getUserOrders } from "@/libs/order";

export async function POST(req) {
    const data = await req.json();
    if (data.action === 'post') {
        try {
            // Assuming you have access to the user and review data
            const name = sanitize(data.name);
            const email = sanitize(data.email);
            const phone = sanitize(data.phone);
            const address = sanitize(data.address);
            const cost = data.cost;
            const order = data.order;
            const transactionID = '';

            if (!email || !order || !phone || !address || !name || !cost || typeof cost !== "number") {
                return Response.json({ error: 'Missing required data', status: 400 });
            }
            const orderData = { name, email, phone, address, cost, order, transactionID };
            const res = await postOrder(orderData);
            return Response.json( res );
        } catch (error) {
            // Handle any errors
            console.error('Error creating order:', error);
            return Response.json({ error: 'Internal server error', status: 500 });
        }
    }
    if (data.action === 'get') {
        try {
            const token = sanitize(data.token);
            const email = sanitize(data.email);
            const res = await getUserOrders(token,email);
            return Response.json(res);
        } catch (error) {
            console.error('Failed to get orders:', error.message);
            throw new Error(error.message);
        }
    }
    return Response.json({ error: 'invalid request', status: 402 });
}
