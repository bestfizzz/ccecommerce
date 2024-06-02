'use client'
import {
    Card,
    CardBody,
    Avatar,
    IconButton,
    Typography,
  } from "@material-tailwind/react";
  
  
  function TeamCard({ img, name, title }) {
    return (
        <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
        <CardBody className="text-center">
          <Avatar
            src={img}
            alt={name}
            variant="circular"
            size="xxl"
            className="mx-auto mb-6 object-top"
          />
          <Typography variant="h5" color="blue-gray" className="!font-medium text-lg">
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="mb-2 !text-base !font-semibold text-gray-600"
          >
            {title}
          </Typography>
          <div className="flex items-center justify-center gap-1.5">
            <IconButton variant="text" color="gray">
              <i className="fa-brands fa-twitter text-lg" />
            </IconButton>
            <IconButton variant="text" color="gray">
              <i className="fa-brands fa-linkedin text-lg" />
            </IconButton>
            <IconButton variant="text" color="gray">
              <i className="fa-brands fa-dribbble text-lg" />
            </IconButton>
          </div>
        </CardBody>
      </Card>
      
    );
  }
  
  
  const members = [
    {
      img: `https://storage.googleapis.com/shop-384517.appspot.com/MicrosoftTeams-image-88-scaled.jpg`,
      name: "Ali",
      title: "COCO Owner",
    },
    {
      img: `https://storage.googleapis.com/shop-384517.appspot.com/Viju-scaled%20(1).jpg`,
      name: "Viju",
      title: `I just know he\'s at the farm`,
    },
    {
      img: `https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/ilgocjh44rkkzjik1xsx.jpg`,
      name: "Pig",
      title: "Animal at the farm",
    },
    {
      img: `https://png.pngtree.com/png-clipart/20230318/ourmid/pngtree-cute-cow-avatar-png-image_6654534.png`,
      name: "Cow",
      title: "Animal at the farm",
    },
    {
      img: `https://media.4-paws.org/3/b/f/3/3bf3d0cc53c66fee4a861a23d773ab0f3aa4729f/VIER%20PFOTEN_2019-10-10_041-2668x2667-600x600.jpg`,
      name: "Chicken",
      title: "Animal at the farm",
    },
    {
      img: `https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTQMf0rCi-1SbtjliBP4itP5HciQ88PN2gUFvtVhufKgL4oBZVTqLRNUQzmI5eya1pi`,
      name: "Goat",
      title: "Animal at the farm",
    },
    {
      img: "https://photos.smugmug.com/Photo-Essay-Galleries/We-All-Honk/i-f7sSpvp/1/DdKRPm8xfGnN4jZQqLcqBCj432vWZgsHnC7rLsTw2/XL/DSC_4752-XL.jpg",
      name: "Goose",
      title: "HONK! HONK! HONK! HONK! HONK!",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGbzD574hh0Hy5dGwH8WJii5RLZxQirzGj_g&s",
      name: "Vegetables",
      title: "and more...",
    },
  ];
  
  export function Troll() {
    return (
      <section id="about-us" className="min-h-screen py-8 px-8">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            Meet members of the farm
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
    );
  }
  
  export default Troll;