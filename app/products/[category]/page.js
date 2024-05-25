import ProductGrid from '@/components/Products/ProductGrid';
import { Suspense } from 'react';
import Loading from '../loading';
import ProductHeader from '@/components/Products/ProductHeader';
import { BreadcrumbCategory } from '@/components/Products/BreadCrumProducts';
export default async function Products({params}) {
    const category = params.category
    const getProductsData = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?get=category&category=${category}`, {method: 'GET'});
        return res.json()
    }
    const products = await getProductsData()
    return (
        <div className='mx-4'>
            <BreadcrumbCategory category_name={category} />
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
