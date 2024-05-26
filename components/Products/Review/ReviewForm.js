'use client'
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import UserAvatar from "./UserAvatar";
import { useState,useContext } from "react";
import { AuthContext } from "@/components/User/AuthContext";

export default function ReviewForm({productInfo}) {
    const [review,setReview] = useState('')
    const { user } = useContext(AuthContext)
    const postReview=async()=>{
        const data = {
            user: user?.displayName || 'anonymous',
            review:review,
            product_reference: productInfo._id
        }
        const res= await fetch(`/api/reviews/`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <div>
            <UserAvatar user={user} />
            <div className="relative md:w-[30rem]">
                <Textarea value={review} onChange={ev=>setReview(ev.target.value)} variant="Outlined" placeholder="Your Comment" rows={8} />
                <div className="flex w-full justify-end py-1.5">
                    <div className="flex gap-2">
                        <Button size="sm" className="rounded-md" onClick={postReview}>
                            Post Comment
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    );
}