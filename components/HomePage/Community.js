'use client'
import {
    Card,
    CardBody,
    Typography,
    CardHeader,
} from "@material-tailwind/react";

function TestimonialCard({ img, client, title, clientInfo }) {
    return (
        <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
            <CardHeader color="transparent" floated={false} shadow={false}>
                <Typography
                    color="blue-gray"
                    className="lg:mb-20 mb-4 text-2xl font-bold"
                >
                    &quot;{title}&quot;
                </Typography>
            </CardHeader>
            <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {client}
                    </Typography>
                    <Typography
                        variant="paragraph"
                        className="font-normal !text-gray-500"
                    >
                        {clientInfo}
                    </Typography>
                </div>
            </CardBody>
        </Card>
    );
}

const testimonials = [
    {
        title: "Impressed with the organic food quality and freshness. The team ensured prompt delivery and incredible flavors. Truly outstanding!",
        client: "Jessica Devis",
        clientInfo: "Customer",
    },
    {
        title:
            "Exceptional quality and flavor in every bite. The organic produce arrived fresh and on time. Fantastic service!",
        client: "Marcell Glock",
        clientInfo: "Customer",
    },
];

export default function Community() {
    return (
        <section className="px-8 py-10 lg:py-10">
            <div className="container mx-auto">
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4 !text-2xl lg:!text-4xl"
                >
                    Reviews from our consumers
                </Typography>
                <Typography
                    variant="lead"
                    className="max-w-3xl !text-gray-500 mb-10 lg:mb-20"
                >
                    From life-enhancing gadgets to unparalleled customer support, and
                    transformative learning opportunities.
                </Typography>
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {testimonials.map((props, key) => (
                        <TestimonialCard key={key} {...props} />
                    ))}
                </div>

                <Card
                    shadow={false}
                    className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6"
                >
                    <CardHeader color="transparent" floated={false} shadow={false}>
                        <Typography
                            color="blue-gray"
                            className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
                        >
                            &quot;Outstanding organic food! Fresh, flavorful, and delivered quickly. Couldn’t be happier with the service!&quot;
                        </Typography>
                    </CardHeader>
                    <CardBody className="items-center mx-auto py-2">
                        <Typography variant="h6" color="blue-gray">
                            Emma Roberts
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="font-normal !text-gray-500"
                        >
                            Customer
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}