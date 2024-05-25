import { getProduct, getProducts, getProductsByCategory } from "@/libs/products"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const get = searchParams.get('get')
    const id = searchParams.get('id')
    const category = searchParams.get('category'); // Corrected spelling of 'category'
    if (get?.toLowerCase() == 'product' && id) {
        let res = await getProduct(id)
        return Response.json(res)
    }

    if (get?.toLowerCase() == 'all') {
        let res = await getProducts()
        return Response.json(res)
    }

    if (get?.toLowerCase() == 'category' && category) {
        let res = category.toLowerCase() == 'all' ? await getProducts() : await getProductsByCategory(category)
        return Response.json(res)
    }
    return Response.status(405).json({ 'error': 'invalid parameters' })
}