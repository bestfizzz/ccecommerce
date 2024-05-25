'use client'
import OrderTable from "@/components/User/Ordertable"
import { Typography } from "@material-tailwind/react"

export default function User({params}){
    const id = params.userID
    return(
        <div className="px-2 md:px-8 flex-col justify-center w-full">
            <Typography variant="h1">Hi, User {id}</Typography>  
            <Typography variant="h4">Your orders</Typography>  
            <OrderTable />
        </div>
    )
}