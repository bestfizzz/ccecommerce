'use client'
import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({})

export default function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? localStorage : null
    const [cartProducts, setCartProducts] = useState([])
    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls.setItem("cart", JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    useEffect(() => {
        if (ls && ls.getItem("cart")) {
            setCartProducts(JSON.parse(ls.getItem("cart")))
        }
    }, [])
    const getNumberOfProducts = () => {
        var numberArrayOfProducts = cartProducts.map(({ quantity }) => quantity)
        return numberArrayOfProducts.reduce((a, b) => a + b, 0)
    }
    const addProductToCart = (product, quantity = 1) => {
        const existingProduct = cartProducts.filter(p => p._id === product._id).length > 0
        if (existingProduct) {
            setCartProducts(prevCart => {
                return prevCart.map(item => {
                    if (item._id === product._id) {
                        return { ...item, quantity: item.quantity + quantity };
                    }
                    return item
                });
            });
        } else {
            const updatedProduct = { ...product, quantity: quantity };
            setCartProducts(prevCart => [...prevCart, updatedProduct]);
        }
    };
    const removeProductFromCart = (product) => {
        const existingProduct = cartProducts.filter(p => p._id === product._id).length > 0
        if (existingProduct) {
            setCartProducts(prevCart => {
                return prevCart.map(item => {
                    if (item._id === product._id) {
                        if (item.quantity - 1 > 0) {
                            return { ...item, quantity: item.quantity - 1 };
                        }else{
                            return null
                        }
                    }
                    return item
                }).filter(p => p !== null);
            });
        }
    }
    const removeAllSpecificProductFromCart = (product) => {
        setCartProducts(prev => {
            return [...prev].filter(p => { return p._id != product._id })
        }
        )
    }
    const wipeCart =async () => {
        await setCartProducts([])//await is necessary
        ls.removeItem("cart")
    }
    const getCost = () => {
        let cost = 0
        for (let i = 0; i < cartProducts.length; i++) {
            cost += parseInt(cartProducts[i].price*cartProducts[i].quantity)
        }
        return cost
    }
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProductToCart, getCost, removeProductFromCart, wipeCart, removeAllSpecificProductFromCart, getNumberOfProducts }}>
            {children}
        </CartContext.Provider>
    )
}