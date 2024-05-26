import sanitize from "@/components/sanatize"
import { getProductReviews,postProductReview } from "@/libs/reviews"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = sanitize(searchParams.get('id'))

    if (id) {
        let res = await getProductReviews(id)
        return Response.json(res)
    }

    return Response.status(400).json({ 'error': 'invalid request' })
}

export async function POST(req) {
    try {
        // Assuming you have access to the user and review data
        const data = await req.json()
        const user = sanitize(data.user)
        const review = sanitize(data.review)
        const product_reference = sanitize(data.product_reference)
        // Check if all required data is available
        if (!user || !review || !product_reference) {
            return Response.json({ error: 'Missing required data' ,status:400});
        }

        // Call the postReview function with the data
        const res = await postProductReview(user, review, product_reference);

        // Return a success response
        return Response.json({ res });
    } catch (error) {
        // Handle any errors
        console.error('Error posting review:', error);
        return Response.json({ error: 'Internal server error',status:500 });
    }
}
