import { Carousel } from "@material-tailwind/react";

export default function ProductImages({ images }) {
    return (
        <Carousel className="rounded-xl min-w-[300px] h-[300px] sm:h-[400px] sm:w-[400px]">
            {images && images.length > 0 ?
                images.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                    )
                })
                :
                <img
                    src={'https://via.placeholder.com/300x300'}
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
            }
        </Carousel>
    );
}