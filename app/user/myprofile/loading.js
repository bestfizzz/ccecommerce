'use client'
import { Spinner } from "@material-tailwind/react"
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex justify-center w-full mt-10">
            <Spinner className="h-12 w-12" />
        </div>

    )
}