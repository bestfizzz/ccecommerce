'use client'
import { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Alert,
} from "@material-tailwind/react";
import Link from "next/link";
import { ResetPasswordByEmail } from "@/libs/auth";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [openAlert, setOpenAlert] = useState(false);
    const Reset = async () => {
        const data = { email }
        setOpenAlert(true)
        return await ResetPasswordByEmail(email)
    }
    return (
        <>
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
                        <Button className="mt-6" disabled={!email} fullWidth onClick={Reset} color='green'>
                            Reset
                        </Button>

                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don&apos;t have an account?{" "}
                            <Link href="/user/signup" className="font-medium text-gray-900">
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
            <Alert
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className='ml-3 sm:ml-8 w-[95%] bottom-[5%] fixed z-50'
            >
                An email has been sent
            </Alert>
        </>
    )
}