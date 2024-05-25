'use client'
import ItemsInCart from '@/components/Cart/ItemsInCart';
import OrderForm from '@/components/CheckOut/OrderForm';
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import Link from 'next/link';
import { useState } from 'react';
export default function CheckOut() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <div className="mt-2 w-fit">
                <Link href="/" className="text-black" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-flex">
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`inline-flex overflow-hidden whitespace-nowrap transition-transform duration-500 ${isHovered ? "translate-x-0" : "-translate-x-1/2 text-transparent"}`}>
                        Return to homepage
                    </span>
                </Link>
            </div>
            <div className='flex items-start'>
                <Breadcrumbs separator=">" className='bg-transparent w-full self-start pl-0 md:pl-6'>
                    <Link href='/' className="opacity-60 text">
                        Home
                    </Link>
                    <span >Order</span>
                    <span className="opacity-60">
                        Payment
                    </span>
                </Breadcrumbs>
            </div>
            <div className='flex w-full flex-col sm:flex-row'>
                <div className='flex-1 md:ml-10'>
                    <OrderForm />
                </div>
                <div className='flex-1 items-center sm:ml-8'>
                    <Typography className="mx-auto mb-11 " variant="h2">Cart</Typography>
                    <ItemsInCart />
                </div>
            </div>
        </>
    )
}