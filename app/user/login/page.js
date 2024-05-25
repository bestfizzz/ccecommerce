'use client'
import { useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Login = () => {
        const data = { email, password }
        console.log(data)
    }
    return (
        <div className="flex px-2 sm:px-0 justify-center min-h-screen items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Welcome back.
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
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                    </div>
                    <Button className="mt-6"  disabled={!email || !password } fullWidth onClick={Login} color='green'>
                        Login
                    </Button>

                    <Typography color="gray" className="mt-4 text-center font-normal">
                        <Link href="/user/forget-password" className="font-medium text-gray-900 text-center">
                            Forgot password?
                        </Link>
                    </Typography>

                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Don&apos;t have an account?{" "}
                        <Link href="/user/signup" className="font-medium text-gray-900">
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}