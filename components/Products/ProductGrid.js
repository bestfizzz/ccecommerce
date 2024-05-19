'use client'
import ProductCard from '@/components/Products/ProductCard';
import {  Alert } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
export default function ProductGrid({products}) {
    console.log(products)
    const [openAlert, setOpenAlert] = useState(false);
    useEffect(() => {
        if (openAlert == true) {
            setInterval(() => {
                setOpenAlert(false);
            }, 3000)
        }
    }, [openAlert])
    return (
        <>
            <div className="grid grid-cols-1 gap-4 justify-items-center mt-6 px-4
        sm:grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4
        xxl:grid-cols-5
        ">
                { products.map((product, index) => (
                        <ProductCard key={index} product={product} setOpenAlert={setOpenAlert} />
                    ))}
            </div>
            <Alert
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className='ml-3 sm:ml-8 w-[95%] bottom-[5%] fixed'
            >
                Cart is updated
            </Alert>
        </>
    )
}