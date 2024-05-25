'use client'
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import UserAvatar from "./UserAvatar";
import { useState } from "react";

export default function ReviewForm() {
    const [review,setReview] = useState('')
    const postReview=()=>{
        const data = {review}
        console.log(data)
    }
    return (
        <div>
            <UserAvatar />
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