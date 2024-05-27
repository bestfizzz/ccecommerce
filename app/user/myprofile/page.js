'use client'
import { AuthContext } from "@/components/User/AuthContext"
import OrderTable from "@/components/User/Ordertable"
import { Typography, Button } from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Correct import
import { Suspense, useContext, useEffect, useState } from "react"
import Loading from "./loading"

export default async function User() {
    const router = useRouter()
    const { user, signout } = useContext(AuthContext)
    const [orders, setOrders] = useState('')
    if (!user) {
        router.push(`/user/login`)
    }
    const logout = async () => { // Asynchronous logout function
        router.push(`/user/login`)
        await signout()
    }
    const getOrders = async () => {
        const data = {
            action: 'get',
            token: await user.accessToken,
            email: await user.email
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return res.json()
    }
    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.email && user?.accessToken) {
                try {
                    const orders = await getOrders();
                    setOrders(orders);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };
        fetchOrders();
    }, [user]);    
    return (
        <>
            {user ?
                <div className="px-2 md:px-8 flex-col justify-center w-full">
                    <Typography variant="h1">Hi, {user.displayName}</Typography>
                    <Typography variant="h4">Your orders</Typography>
                    <Suspense fallback={Loading}>
                        <OrderTable orders={orders} />
                    </Suspense>
                    <div className="flex w-full justify-end py-1.5">
                        <div className="flex gap-2">
                            <Link href={'/'}>
                                <Button size="sm" className="rounded-md">
                                    Home
                                </Button>
                            </Link>
                            <Button size="sm" className="rounded-md" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
                :
                ''
            }
        </>
    )
}