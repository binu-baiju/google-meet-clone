"use client";

import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import { useSocket } from "@/context/socket";
import { useSearchParams } from "next/navigation";

const usePeer = (roomId: string) => {
  const socket = useSocket();
  // Get roomId from URL
  console.log("roomid:", roomId);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myId, setMyId] = useState("");
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    // if (!router.isReady) return;

    var myPeer = new Peer();
    setPeer(myPeer);

    myPeer.on("open", (id) => {
      console.log("peer id:", id);
      setMyId(id);
      // socket?.emit("join-room", roomId, id);
      // console.log("hello");
      if (socket) {
        console.log("Emitting join-room event");
        socket.emit("join-room", roomId, id);
        console.log("join-room event emitted");
      } else {
        console.error("Socket is not connected");
      }
    });
  }, [roomId, socket]);
  return {
    peer,
    myId,
  };
};

export default usePeer;
