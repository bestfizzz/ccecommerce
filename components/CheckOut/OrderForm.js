import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Cart/CartContext";
import { checkout } from '@/libs/stripe'
import { AuthContext } from "../User/AuthContext";

export default function OrderForm() {
    const { getCost, cartProducts } = useContext(CartContext)
    const {user}=useContext(AuthContext)
    const [inputDisabled,setInputDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ticked, setTicked] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [cost, setCost] = useState(0)
    const [openAlert, setOpenAlert] = useState(false)
    const [alert, setAlert] = useState('Redirecting to checkout...')
    useEffect(() => {
        setCost(() => getCost())
    }, [cartProducts])
    useEffect(() => {
        setName(user.displayName)
        setEmail(user.email)
        setInputDisabled(user?true:false)
    }, [user])
    const uploadOrder = async (data) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            return res.json()
        } catch (error) {
            return {error: error}
        }
    }
    const submitOrder = async (ev) => {
        ev.preventDefault();
        setLoading(true)
        const data = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            cost: cost,
            order: cartProducts,
            action: 'post'
        }

        if (ticked && cost > 0) {
            try {
                setAlert('Creating Order...')
                setOpenAlert(true)
                const res = await uploadOrder(data)
                console.log(res)
                if (!res || res.error) {
                    setAlert('Something went wrong')
                    setLoading(false)
                    return false
                } else {
                    setAlert('Redirecting to payment...')
                }
                setOpenAlert(true)
                const stripeCart = cartProducts.map(item => ({
                    price: item.stripeID,
                    quantity: item.quantity
                }));

                await checkout({ lineItems: stripeCart, email: email, orderId: res });

                // Redirect after successful checkout initiation
                console.log("Redirecting to payment...");
            } catch (error) {
                console.error("Error during order submission:", error);
                // Handle the error appropriately here
            }
        }
        setLoading(false)
    };

    return (
        <>
            <Card color="transparent" shadow={false} className="">
                <Typography variant="h4" color="blue-gray">
                    Customer Information
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details.
                </Typography>
                <form onSubmit={submitOrder} className="mt-8 mb-2 max-w-screen-lg md:w-auto md:pr-7 sm:min-w-80 w-auto">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg"  value={name} onChange={ev => setName(ev.target.value)} disabled={inputDisabled} required={!inputDisabled} label="Name" />
                        <Input size="lg" value={email} onChange={ev => setEmail(ev.target.value)} disabled={inputDisabled} required={!inputDisabled} label="Email" />
                        <Input size="lg" value={phone} onChange={ev => setPhone(ev.target.value)} required label="Phone" />
                        <Input size="lg" value={address} onChange={ev => setAddress(ev.target.value)} required label="Address" />
                    </div>
                    <Checkbox
                        value={ticked}
                        label={
                            (
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree to buy this product
                                </Typography>
                            )
                        }
                        containerProps={{ className: "-ml-2.5" }}
                        onClick={() => setTicked(!ticked)}
                    />
                    <Button color='green' disabled={!ticked || cost <= 0 || loading} type="submit" className="mt-6" fullWidth>
                        Comfirm
                    </Button>
                </form>
            </Card>
            <Alert
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className='ml-3 sm:ml-4 w-[95%] bottom-[5%] fixed z-50'
                color="green"
                variant="gradients"
            >
                {alert}
            </Alert>
        </>
    );
}