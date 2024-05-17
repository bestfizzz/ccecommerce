import { numberWithCommas } from "../numberWithCommas"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "./CartContext"
import { Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation"

export default function ItemsInCart() {
    const { cartProducts, addProductToCart, removeProductFromCart, getCost, removeAllSpecificProductFromCart } = useContext(CartContext)
    const router = useRouter()
    const noScrollbar = " h-72 mx-auto relative max-w-lg bg-transparent flex flex-col divide-y border-b-2 border-black"
    const showScrollbar = noScrollbar + " overflow-y-scroll scrollbar"

    const directToProduct=(productId)=>{
        router.push('/products/'+productId)
    }
    return (
        <div class="scale-100 sm:scale-110 md:scale-120 ">
            <div className={cartProducts.length > 3  ? showScrollbar : noScrollbar}>
                {cartProducts.map(function (product) {
                    return (
                        <div key={product._id} className="flex gap-2 sm:gap-4 sm:p-3 w-full">
                            <img onClick={()=>directToProduct(product._id)} className=" w-16 h-16 cursor-pointer" src={product.images[0]} />
                            <div className="flex flex-col w-full gap-y-4 h-full">
                                <div className="flex justify-between w-full">
                                    <div className="flex">
                                        <p onClick={()=>directToProduct(product._id)} className="cursor-pointer text-slate-500 text-sm font-medium max-w-[16ch] sm:max-w-[30ch] md:max-w-[40ch]">
                                            {
                                                product.title.length > 60 ?
                                                    product.title.slice(0, 60) + '...'
                                                    :
                                                    product.title}
                                        </p>
                                        <svg onClick={() => removeAllSpecificProductFromCart(product)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1 inline-flex hover:fill-red-600 cursor-pointer">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-500 text-sm font-small ">{numberWithCommas(product.price) + '₫'} </p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="flex items-center text-slate-300 text-sm font-medium select-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => addProductToCart(product)} className="w-4 h-4 cursor-pointer font-black mr-4 inline-flex">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="font-normal text-base">{product.quantity}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => removeProductFromCart(product)} className="w-4 h-4 cursor-pointer font-black ml-4 inline-flex">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                        </svg>
                                    </p>
                                    <p className="text-gray-600 text-sm font-small ">{numberWithCommas(product.price * product.quantity) + '₫'} </p>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
                }
            </div>
            <div className="flex justify-between w-full max-w-[512px] mx-auto">
                <Typography className="mt-4 text-3xl" variant="h2">Total: </Typography>
                <Typography className="mt-4 text-3xl" variant="h2">{numberWithCommas(getCost())}₫</Typography>
            </div>
        </div>
    )
}