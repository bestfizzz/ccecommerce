'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

export default function Success() {
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            router.push('/');
        }, 3000)
        return () => clearTimeout(redirectTimeout)
    }, []);
    const id = searchParams.get('payment_id')
    return (
        <div className="min-h-[400px] mt-3">
            <Typography variant="h2">
                <span className="inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="green" className="w-11 h-11">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Order Successed, redirecting ...
                </span>
            </Typography>
            <h1>PaymentID:{id}</h1>
        </div>
    )
}