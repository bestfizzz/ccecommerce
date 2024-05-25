import { getCategories } from "@/libs/categories"

export async function GET(req) {
    try {
        let res = await getCategories();
        return Response.json(res);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return Response.error(500, "Internal Server Error");
    }
}
