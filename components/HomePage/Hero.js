'use client'
import {
  Button,
  Typography,
  Input,
  Alert,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const sendEmail = async () => {
    const data = {
      email: email,
    }
    const res = await fetch(`/api/emails/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if (res.status === 200) {
      setEmail('')
      setOpenAlert(true)
    }
  }
  return (
    <>
      <header className="bg-white">
        <div className="p-8 grid min-h-[250px] w-full lg:h-[450px] md:h-[350px] place-items-stretch bg-[url('/organic-food-benefits.jpg')] bg-center bg-cover bg-no-repeat">
          <div className="container mx-auto px-4 text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
              Experience the taste of nature with our {" "}
              <span className="text-green-500 leading-snug ">
                farm-fresh
              </span>{" "}
              and{" "}
              <span className="leading-snug text-green-500">
                organic
              </span>
              {" "}produce.
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              The time is now for it to be okay to be great. For being a bright
              color. For standing out.
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Input color="gray" value={email} onChange={ev => setEmail(ev.target.value)} className="bg-white" label="Enter your email" size="lg" />
                <Button
                  color="gray"
                  className="w-full px-4 md:w-[12rem]"
                  onClick={sendEmail}
                >
                  get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className='ml-3 sm:ml-8 w-[95%] bottom-[5%] fixed z-50'
      >
        We have received your email
      </Alert>
    </>
  );
}