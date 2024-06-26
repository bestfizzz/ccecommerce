'use client'
import Link from "next/link"
import { Breadcrumbs } from "@material-tailwind/react"
import capitalize from "../capitalize"
export function BreadcrumbProducts() {
    return (
        <div className='flex items-start'>
            <Breadcrumbs separator=">" className='bg-transparent w-full self-start pl-0 md:pl-6'>
                <Link href='/' className="opacity-60 text">
                    Home
                </Link>
                <span >Products</span>
            </Breadcrumbs>
        </div>
    )
}

export function BreadcrumbProduct({product_name}) {
    return (
        <div className='flex items-start'>
            <Breadcrumbs separator=">" className='bg-transparent w-full self-start pl-0 md:pl-6'>
                <Link href='/' className="opacity-60 text">
                    Home
                </Link>
                <Link href='/products' className="opacity-60 text">
                Products
                </Link>
                <span >{capitalize(product_name)}</span>
            </Breadcrumbs>
        </div>
    )
}

export function BreadcrumbCategory({category_name}) {
    return (
        <div className='flex items-start'>
            <Breadcrumbs separator=">" className='bg-transparent w-full self-start pl-0 md:pl-6'>
                <Link href='/' className="opacity-60 text">
                    Home
                </Link>
                <Link href='/products' className="opacity-60 text">
                Products
                </Link>
                <span >Category</span>
                <span >{capitalize(category_name)}</span>
            </Breadcrumbs>
        </div>
    )
}