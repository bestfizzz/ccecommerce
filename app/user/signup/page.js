'use client'
import { useState, useContext, useEffect } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert,
} from "@material-tailwind/react";
import Link from "next/link";
import { AuthContext } from "@/components/User/AuthContext";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const { signup, user } = useContext(AuthContext)
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ticked, setTicked] = useState(false)
    const [error, setError] = useState('')
    const [openAlert, setOpenAlert] = useState(false);
    const Signup = async () => {
        const data = { name, email, password }
        try {
            const response = await signup(name, email, password)
            router.refresh(`/user/myprofile`)
        } catch (error) {
            console.error('Error:', error);
            setOpenAlert(true)
            setError(error)
        }
    }
    useEffect(() => {
        if (user) {
            router.push(`/user/myprofile`);
        }
    }, [user, router]);

    return (
        <>
            <div className="flex justify-center min-h-screen items-center">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-1">
                                    Your Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={ev => setName(ev.target.value)}
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}

                                />
                            </div>
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
                        <Checkbox
                            onClick={() => setTicked(!ticked)}
                            value={ticked}
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree to the
                                    <a
                                        href="#"
                                        className="font-medium transition-colors hover:text-gray-900 ml-1"
                                    >
                                        Terms and Conditions
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button className="mt-6" disabled={!email || !password || !ticked} fullWidth onClick={Signup} color='green'>
                            Sign Up
                        </Button>

                        <Typography color="gray" className="mt-4 text-center font-normal">
                            <Link href="/user/forget-password" className="font-medium text-gray-900 text-center">
                                Forgot password?
                            </Link>
                        </Typography>

                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link href="/user/login" className="font-medium text-gray-900">
                                Login
                            </Link>
                        </Typography>
                    </form>
                </Card >
            </div >
            <Alert
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className='ml-3 sm:ml-8 w-[95%] bottom-[5%] fixed'
                color="red"
                variant="gradient"
            >
                {error}
            </Alert>
        </>
    )
}