"use client";
import Header from "@/components/Header/page";
import CorouselWithSlide from "@/components/Corousel/page";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Home = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const extractRoomId = (input: string) => {
    try {
      const url = new URL(input);
      return url.pathname.split("/").pop();
    } catch (e) {
      return input;
    }
  };

  const joinRoom = () => {
    const roomToJoin = extractRoomId(roomId);
    if (roomToJoin) router.push(`/${roomToJoin}`);
    else {
      toast({
        variant: "destructive",
        title: "Please provide a valid room id or link",
        // description: "There was a problem with your request.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      // alert("Please provide a valid room id");
    }
  };

  // const extractCodeFromUrl = (input: string): string | null => {
  //   const parts = input.split("/");
  //   const lastPart = parts[parts.length - 1];
  //   return /^\d+$/.test(lastPart) ? lastPart : null;
  // };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const input = e.target.value;
  //   const codeFromUrl = extractCodeFromUrl(input);

  //   if (codeFromUrl !== null) {
  //     setRoomId(codeFromUrl);
  //     setError("");
  //   } else if (/^\d*$/.test(input)) {
  //     setRoomId(input);
  //     setError("");
  //   } else {
  //     setRoomId(input);
  //     setError("Incorrect input. Please enter a valid code or link.");
  //   }
  // };

  // const extractCodeFromUrl = (input: string): string | null => {
  //   const parts = input.split("/");
  //   const lastPart = parts[parts.length - 1];
  //   return /^\d+$/.test(lastPart) ? lastPart : null;
  // };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const input = e.target.value;
  //   setInputValue(input);

  //   const codeFromUrl = extractCodeFromUrl(input);

  //   if (codeFromUrl !== null) {
  //     setRoomId(codeFromUrl);
  //     setError("");
  //   } else if (/^\d+$/.test(input)) {
  //     setRoomId(input);
  //     setError("");
  //   } else {
  //     setError("Incorrect input. Please enter a valid code or link.");
  //   }
  // };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const day = now.toLocaleString("en-US", { weekday: "short" });
      const month = now.toLocaleString("en-US", { month: "short" });
      const dayOfMonth = now.getDate();
      setCurrentTime(
        `${formattedHours}:${formattedMinutes}${ampm} .${day},${month} ${dayOfMonth}`
      );
    };

    updateDateTime(); // Initial call to set the time immediately

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000; // Delay until the next minute

    // Set a timeout to update the time at the start of the next minute
    const timeoutId = setTimeout(() => {
      updateDateTime();
      // Set an interval to update the time every minute thereafter
      const intervalId = setInterval(updateDateTime, 60000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, delay);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="text-neutral-600  h-screen flex flex-col">
      {/* <Header />
      <div className="bg-green-500 flex-grow">
        <div>Hello</div>
        <div>hello</div>
      </div> */}

      <Header currentTime={currentTime} />
      <div className="w-full h-full flex lg:flex-row items-center   md:flex-col md:mt-5  gap-24 ">
        <div className="lg:w-1/2 md:w-3/4 flex flex-col gap-8  ">
          <div className="flex flex-col justify-center items-center  gap-8">
            <h1 className="lg:text-5xl md:text-5xl text-left   font-lg ml-20">
              Video calls and meeting for everyone
            </h1>
            <span className=" md:text-md -500 mr-5 text-left ">
              Connect,collaborate, and celebrate from anywhere with Google meet
            </span>
          </div>
          <div className="flex pl-20 gap-4 ">
            <Button
              size="sm"
              className="h-12 bg-blue-500 hover:bg-blue-600"
              onClick={createAndJoin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M360-320h80v-120h120v-80H440v-120h-80v120H240v80h120v120ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
              </svg>
              New Meeting{" "}
            </Button>
            <div className="relative w-2/5  ">
              <Input
                className="pl-9 h-12"
                placeholder="Enter a code or link"
                value={roomId}
                // value={inputValue}
                onChange={(e) => setRoomId(e?.target?.value)}
                // onChange={handleChange}
              />
              {/* {error && <p className="text-red-500">{error}</p>} */}
              {/* <Search className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" /> */}
              <svg
                className="absolute left-0 top-1.5 m-2.5 h-4 w-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-440h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-560h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-280v-400 400Z" />
              </svg>
            </div>
            <Button
              variant="ghost"
              className="h-12 text-blue-500 hover:text-blue-500"
              onClick={joinRoom}
            >
              Join
            </Button>
          </div>
        </div>
        <div
          className="w-1/2 lg:w-1/2 ml-8  flex justify-center
        "
        >
          <CorouselWithSlide />
        </div>
      </div>
    </div>
  );
};

export default Home;
