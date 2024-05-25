import { getCategories } from "@/libs/categories"

export async function GET(req) {
    try {
        let res = await getCategories();
        console.log(res);
        return Response.json(res);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return Response.status(500).json({ 'error': 'server error' })
    }
}
