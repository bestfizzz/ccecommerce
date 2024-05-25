import ProductGrid from '@/components/Products/ProductGrid';
import { Suspense } from 'react';
import Loading from './loading';
import ProductHeader from '@/components/Products/ProductHeader';
import { BreadcrumbProducts } from '@/components/Products/BreadCrumProducts';
export default async function Products({ params, searchParams }) {
    const getProductsData = async () => {
        if (searchParams?.search) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?get=search&search=${searchParams.search}`, { method: 'GET' });
            return res.json()
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?get=all`, { method: 'GET' });
            return res.json()
        }
    }
    const products = await getProductsData()
    return (
        <div className='mx-4'>
            <BreadcrumbProducts />
            <ProductHeader />
            <Suspense fallback={<Loading />}>
                {products ?
                    <ProductGrid products={products} />
                    :
                    <h1>Failed to get product</h1>
                }
            </Suspense>
        </div>
    );
}
