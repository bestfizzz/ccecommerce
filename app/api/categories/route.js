import { getCategories } from "@/libs/categories"

export async function GET(req) {
    let res = await getCategories()
    return Response.json(res)
}