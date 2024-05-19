import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import ReviewHeader from "./ReviewHeader";

export default function Review() {
    return (
        <div className="w-full md:px-20 flex-col mx-auto mt-10">
            <ReviewHeader />
            <div className="container mx-auto lg:flex">
                <div className="flex-1 px-2 md:pr-10">
                <ReviewForm />
                </div>
                <div className="flex-1 lg:border-l-2 px-2 md:px-10">
                    <ReviewCard />
                </div>
            </div>

        </div>
    )
}