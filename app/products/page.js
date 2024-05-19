import ProductGrid from '@/components/Products/ProductGrid';
import { Suspense } from 'react';
import Loading from './loading';
import ProductHeader from '@/components/Products/ProductHeader';
import { BreadcrumbProducts } from '@/components/Products/BreadCrumProducts';
export default async function Products() {
    const getProductsData = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {method: 'GET', cache:'no-cache'});
        return res.json()
    }
    const products = await getProductsData()
    return (
        <div className='mx-4'>
            <BreadcrumbProducts />
            <ProductHeader />
            <Suspense fallback={<Loading />}>
                {products?
                <ProductGrid products={products} />
                :
                <h1>Failed to get product</h1>
                }
            </Suspense>
        </div>
    );
}
