'use client'
import { useContext, useEffect, useState } from "react";
import { Typography, Button, Alert } from "@material-tailwind/react";
import capitalize from "../capitalize";
import ProductImages from "@/components/Products/ProductImages";
import { CartContext } from "@/components/Cart/CartContext";
export default function ProductInfo({ productInfo }) {
    const { addProductToCart } = useContext(CartContext)
    const [quantityValue, setQuantityValue] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    useEffect(() => {
        if (openAlert == true) {
            setInterval(() => {
                setOpenAlert(false);
            }, 3000)
        }
    }, [openAlert])

    const handleIncrease = () => {
        setQuantityValue((prevQuantityValue) => prevQuantityValue + 1);
    };

    const handleDecrease = () => {
        setQuantityValue((prevQuantityValue) => prevQuantityValue > 1 ? prevQuantityValue - 1 : 1);
    };

    const addNumberOfProductsToCart = (product, quantityValue) => {
        addProductToCart(product, quantityValue)
        setOpenAlert(true)
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center mt-8">
                <div className="mx-auto sm:mx-0">
                    <ProductImages images={productInfo.images} />
                </div>
                <div className="flex flex-col mx-0 mt-0 sm:mx-8">
                    <Typography variant='h3' className="max-w-[40ch] font-[500]">
                        {capitalize(productInfo.title)}
                    </Typography>
                    <Typography variant='lead' className="font-thin">{productInfo.category}</Typography>
                    <Typography variant='h4'>{productInfo.price}₫</Typography>
                    <div className="flex items-center">
                        <button
                            className="px-2 py-1 bg-gray-200 text-gray-600 rounded-l"
                            onClick={handleDecrease}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="w-16 py-1 border border-gray-300 rounded-none text-center"
                            value={quantityValue}
                            onChange={(e) => Number(e.target.value) >= 0 || e.target.value == '' ? setQuantityValue(Number(e.target.value)) : 1}
                        />
                        <button
                            className="px-2 py-1 bg-gray-200 text-gray-600 rounded-r"
                            onClick={handleIncrease}
                        >
                            +
                        </button>
                    </div>
                    <Button variant="gradient" type="button" onClick={() => addNumberOfProductsToCart(productInfo, quantityValue)} size="sm" className="my-2">
                        <span>Add to cart</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2 inline-flex">
                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                        </svg>
                    </Button>
                    <Typography variant='h4'>Properties</Typography>
                    {productInfo.properties ? Object.keys(productInfo.properties).map((key, index) => {
                        if (productInfo.properties[key] != '' && productInfo.properties[key]) {
                            return <Typography key={index} className="ml-4 font-thin" variant='h5'>- {capitalize(key)}: {productInfo.properties[key]}</Typography>
                        }
                    })
                        :
                        <Typography variant='h5'>No properties</Typography>
                    }
                    <div>
                        <Typography variant='h4'>Description</Typography>
                        <Typography variant='small' className="max-w-[70ch]">{productInfo.description}</Typography>
                    </div>
                </div>
            </div>

            <Alert
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className='ml-3 sm:ml-8 w-[95%] bottom-[5%] fixed'
            >
                Cart is updated
            </Alert>
        </>
    )
}