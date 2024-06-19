import { getProduct, getProducts, getProductsByCategoryDesendences,getProductsBySearch } from "@/libs/products"
import sanitize from "@/components/sanatize"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const get = sanitize(searchParams.get('get'))
    const id = sanitize(searchParams.get('id'))
    const category = sanitize(searchParams.get('category'))
    const search = sanitize(searchParams.get('search'))

    if (get?.toLowerCase() == 'product' && id) {
        let res = await getProduct(id)
        return Response.json(res)
    }

    if (get?.toLowerCase() == 'all') {
        let res = await getProducts()
        return Response.json(res)
    }

    if (get?.toLowerCase() == 'category' && category) {
        let res = decodeURI(category.toLowerCase()) == 'all' ? await getProducts() : await getProductsByCategoryDesendences(category)
        return Response.json(res)
    }

    if (get?.toLowerCase() == 'search' && search) {
        let res = await getProductsBySearch(search)
        return Response.json(res)
    }

    return Response.status(400).json({ 'error': 'invalid request' })
}
