"use client";
import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function CarouselWithSlide() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const snapList = api.scrollSnapList();
    console.log("snapList:", snapList);

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {/* {Array.from({ length: 2 }).map((_, index) => ( */}
          <CarouselItem className="flex flex-col  items-center justify-center">
            <Image
              // className="flex  items-center justify-center"
              priority
              src={
                "/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
              }
              alt="Follow us on Twitter"
              width={200}
              height={200}
            ></Image>
            <div className=" flex flex-col items-center justify-center mt-4 ">
              <h1 className="font-lg text-lg">Your meeting is safe</h1>
            </div>
          </CarouselItem>
          <CarouselItem className="flex flex-col  items-center justify-center">
            <Image
              // className="flex  items-center justify-center"
              priority
              src={
                "/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg"
              }
              alt="Follow us on Twitter"
              width={190}
              height={190}
            ></Image>
            <div className=" flex flex-col items-center justify-center mt-4 ">
              <h1 className="font-lg text-lg">Get a link you can share</h1>
            </div>
          </CarouselItem>

          {/* // ))} */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground  w-full max-w-xs">
        {current} of {count}
      </div>
    </div>
  );
}
