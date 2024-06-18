import { Suspense } from "react";
import Loading from "./loading";
import ProductInfo from "@/components/Products/ProductInfo";
import { BreadcrumbProduct } from "@/components/Products/BreadCrumProducts";
import Review from "@/components/Products/Review/Review";

export default async function ProductPage({ params }) {
    const id = params.productID
    const getProductData = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?get=product&id=${id}`, { method: 'GET',cache:'no-cache' });
        return res.json()
    }
    const getProductReviews = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews?id=${id}`, { method: 'GET', cache: 'no-cache' });
        return res.json()
    }
    const productInfo = await getProductData(id)
    const reviews = await getProductReviews(id)
    return (
        <div>
            <Suspense fallback={<Loading />}>
                {productInfo ?
                    <>
                        <BreadcrumbProduct product_name={productInfo.title} />
                        <ProductInfo productInfo={productInfo} />
                        <Review productInfo={productInfo} reviews={reviews}/>
                    </>
                    :
                    <h1>Falied to get prodcut</h1>
                }
            </Suspense>
        </div>
    )
}