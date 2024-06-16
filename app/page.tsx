"use client";
import { useEffect } from "react";
import io from "socket.io-client";
import { useSocket } from "../context/socket";

const Home = () => {
  const socket = useSocket();
  useEffect(() => {
    // const socketInitializer = async () => {
    // await fetch("/api/socket");
    // socket = io("http://localhost:4000");

    socket?.on("connect", () => {
      console.log("hello");

      console.log("Socket id:", socket.id);
    });
    // };

    // socketInitializer();
  }, [socket]);

  return <h2>Hello</h2>;
};

export default Home;
