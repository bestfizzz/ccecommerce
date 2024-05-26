import { postEmail } from "@/libs/email";
import sanitize from "@/components/sanatize";

export async function POST(req) {
    try {
        // Assuming you have access to the user and review data
        const data = await req.json()
        const email = sanitize(data.email)
        // Check if all required data is available
        if (!email) {
            return Response.json({ error: 'Missing required data' ,status:400});
        }
        // Call the postReview function with the data
        const res = await postEmail(email);

        // Return a success response
        return Response.json({ res });
    } catch (error) {
        // Handle any errors
        console.error('Error posting review:', error);
        return Response.json({ error: 'Internal server error',status:500 });
    }
}