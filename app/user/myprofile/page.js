'use client'
import { AuthContext } from "@/components/User/AuthContext"
import OrderTable from "@/components/User/Ordertable"
import { Typography, Button } from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Correct import
import { useContext } from "react"

export default function User() {
    const router = useRouter()
    const { user, signout } = useContext(AuthContext)
    if (!user) {
        router.push(`/user/login`)
    }
    const logout = async () => { // Asynchronous logout function
        router.push(`/user/login`)
        await signout()
    }
    return (
        <>
            {user ?
                <div className="px-2 md:px-8 flex-col justify-center w-full">
                    <Typography variant="h1">Hi, {user.displayName}</Typography>
                    <Typography variant="h4">Your orders</Typography>
                    <OrderTable />
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