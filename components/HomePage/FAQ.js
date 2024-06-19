'use client'
import React from "react";
import { Typography } from "@material-tailwind/react";

const faqs = [
    {
        title: "How do I order?",
        desc: "To place an order, visit our website and browse through our products. Select the items you wish to purchase, add them to your cart, and proceed to checkout. Follow the prompts to enter your shipping address and payment details to complete your order.",
    },
    {
        title: "How can I make the payment?",
        desc: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. During checkout, you can choose your preferred payment option and follow the instructions to securely complete the transaction.",
    },
];


export default function FAQ() {
    return (
        <section id='FAQ' className="px-8 py-20">
            <div className="container mx-auto">
                <div className="mb-14 text-center ">
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mb-4 text-4xl !leading-snug lg:text-[40px]"
                    >
                        Frequently asked questions
                    </Typography>
                    <Typography
                        className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl"
                    >
                        A lot of people don&apos;t appreciate the moment until it&apos;s
                        passed. I&apos;m not trying my hardest, and I&apos;m not trying to
                        do.
                    </Typography>
                </div>
                <div className="max-w-3xl mx-auto grid gap-10">
                    {faqs.map(({ title, desc }) => (
                        <div key={title}>
                            <Typography color="blue-gray" className="pb-6 text-[20px] font-bold">
                                {title}
                            </Typography>
                            <div className="border-t border-gray-200 pt-4">
                                <Typography className="font-normal !text-gray-500">
                                    {desc}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
