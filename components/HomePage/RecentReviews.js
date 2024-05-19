'use client'
import {
    Card,
    CardBody,
    Rating,
    Typography,
  } from "@material-tailwind/react";
  
  
  export function CardReview({
    name,
    feedback,
    date,
    title,
  }) {
    return (
      <Card shadow={false}>
        <CardBody className="pt-0">
          <Rating value={4} className="text-amber-500" />
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-bold mb-2 mt-1"
          >
            {title}
          </Typography>
          <Typography className="text-base font-normal !text-gray-500">
            {feedback}
          </Typography>
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-medium mt-3"
          >
            {name}
          </Typography>
          <Typography
            variant="small"
            className="font-normal !text-gray-500"
          >
            {date}
          </Typography>
        </CardBody>
      </Card>
    );
  }
  
  const CONTENTS = [
    {
      title: "This food has made my life better",
      name: "Ryan Samuel",
      feedback:
        "I've been buying here for a while now, and it's become an essential part of my daily routine. It's incredibly healthy and has greatly improved my quality of life.",
      date: "03 March 2024",
    },
    {
      title: "It's made my life so much better",
      name: "Emma Roberts",
      feedback:
        "I've been purchasing organic products from this store for months now, and the quality has always been exceptional. These products have had a significant positive impact on my health and well-being. Quality products. Highly recommended!",
      date: "14 February 2023",
    },
    {
      title: "It's my favourite go-to.",
      name: "Bruce Mars",
      feedback:
        "The organic food from this store is consistently top-notch. I can always count on fresh, delicious produce. Will buy here until I die.",
      date: "10 February 2023",
    },
  ];
  export function OverviewSection3() {
    return (
      <section className="py-20 px-8">
        <div className="mx-auto container">
          <div className="text-center">
            <Typography variant="h6" className="mb-3 uppercase">
                Recent reviews
            </Typography>
            <Typography variant="h3">Our Customer&apos;s Opinion</Typography>
          </div>
          <div className="mt-5 grid lg:grid-cols-3 grid-cols-1 gap-y-6">
            {CONTENTS.map(({ name, feedback, title, date }, index) => (
              <CardReview
                key={index}
                title={title}
                name={name}
                feedback={feedback}
                date={date}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default OverviewSection3;