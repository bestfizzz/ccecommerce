'use client'
import { useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const Reset = () => {
        const data = { email }
        console.log(data)
    }
    return (
        <div className="flex px-2 sm:px-0 justify-center min-h-screen items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Forgot password ?
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Fill some information and we will get yours back.
                </Typography>
                <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                    </div>
                    <Button className="mt-6"  disabled={!email} fullWidth onClick={Reset} color='green'>
                        Reset
                    </Button>

                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Don&apos;t have an account?{" "}
                        <a href="/user/signup" className="font-medium text-gray-900">
                            Sign Up
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}