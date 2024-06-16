import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

// Extending the NextApiResponse type to include a socket server
type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: Server;
    };
  };
};

interface ResponseData {
  message: string;
}

// const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
export function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("called api");
  // @ts-ignore:
  if (!res.socket || !res.socket.server) {
    throw new Error("Socket server object is not available in response");
  }
  // @ts-ignore:
  if (res.socket.server.io) {
    console.log("socket already running");
  } else {
    console.log("setting up socket server");
    // @ts-ignore:
    const io = new Server(res.socket.server);
    // @ts-ignore:
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("server is connected");
    });
  }

  res.status(200).json({ message: "Socket setup complete" });
  res.end();
}

// export default SocketHandler;
