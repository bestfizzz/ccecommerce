import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Cart/CartContext";

export default function OrderForm() {
    const { getCost,cartProducts } = useContext(CartContext)
    const [ticked, setTicked] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [cost, setCost] = useState(0)
    useEffect(() => {
        setCost(() => getCost())
    }, [cartProducts])
    const submitOrder = async (ev) => {
        ev.preventDefault()
        if (ticked && cost > 0) {
            // const links = (await axios.post('/api/payment', { cost: cost })).data
            // if (links.url) {
            //     // Redirect the user to the specified URL
            //     const ls = typeof window !== "undefined" ? localStorage : null
            //     ls.setItem("orderFormData", JSON.stringify({ name, email, phone, address,transactionID:links.orderId }))
            //     window.location.href = links.url;
            //     return;
            // }
        }
    }
return (
    <Card color="transparent" shadow={false} className="">
        <Typography variant="h4" color="blue-gray">
            Customer Information
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details.
        </Typography>
        <form onSubmit={submitOrder} className="mt-8 mb-2 max-w-screen-lg md:w-auto md:pr-7 sm:min-w-80 w-auto">
            <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" value={name} onChange={ev => setName(ev.target.value)} required label="Name" />
                <Input size="lg" value={email} onChange={ev => setEmail(ev.target.value)} required label="Email" />
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
            <Button color={ticked && cost > 0 ? '' : "gray"} type="submit" className="mt-6" fullWidth>
                Comfirm
            </Button>
        </form>
    </Card>
);
}