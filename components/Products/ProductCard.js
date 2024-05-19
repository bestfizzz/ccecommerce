'use client'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter
} from "@material-tailwind/react";
import { useContext } from "react";
import { CartContext } from "@/components/Cart/CartContext"
import { numberWithCommas } from "@/components/numberWithCommas";
import Link from "next/link";
export default function ProductCard({ product,setOpenAlert }) {
    const { addProductToCart } = useContext(CartContext)
    return (
        <Card className="w-80 h-fit">
            <Link href={'/products/' + product._id}>
                <CardHeader shadow={false} floated={false} className="h-64">
                    <img
                        src={product.images[0]?product.images[0]:"https://via.placeholder.com/300x300"}
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
                <CardBody className="pb-0">
                    <div className="flex justify-between mb-2">
                        <Typography color="blue-gray" className="font-bold text-sm h-[40px]">
                            {
                            product.title.length>45?
                            product.title.slice(0, 50)+'...'
                            :
                            product.title}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium">
                            {numberWithCommas(product.price) + '₫'}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <Typography variant="small" color="gray" className="font-normal opacity-75">
                            Category
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal opacity-75">
                            {product.category}
                        </Typography>
                    </div>

                </CardBody>
            </Link>
            <CardFooter className="pt-6">
                <Button
                    type="button"
                    onClick={() => {
                        addProductToCart(product)
                        setOpenAlert(true)
                    }}
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}