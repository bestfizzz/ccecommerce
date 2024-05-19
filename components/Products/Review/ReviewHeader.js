'use client'
import { Typography } from "@material-tailwind/react";

export default function ReviewHeader(){
    return (
        <div className="container mx-auto">
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4 !text-2xl lg:!text-4xl"
                >
                    Share your thought and comments
                </Typography>
                <Typography
                    variant="lead"
                    className=" !text-gray-500 mb-5 lg:mb-10"
                >
                    We value your feedback! Share your experiences, suggestions, and questions with us. Thank you for being part of our community!
                </Typography>
        </div>
    )
}