"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketContextType>(null);

  useEffect(() => {
    const URL =
      process.env.NODE_ENV === "production"
        ? "https://google-meet-clone-1.onrender.com"
        : "http://localhost:4000";
    const connection: Socket = io(URL);
    console.log("socket connection", connection);
    setSocket(connection);

    connection.on("connect_error", async (err) => {
      console.log("Error establishing socket", err);
      await fetch(URL);
    });

    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
