import { useState } from "react";
import { Stream } from "stream";
import { cloneDeep } from "lodash";
import { useSocket } from "@/context/socket";
import Peer from "peerjs";
import { useRouter } from "next/navigation";

export interface PlayerState {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
}

export type Players = {
  [key: string]: PlayerState;
};

const usePlayer = (myId: string, roomId: string, peer: Peer | null) => {
  const socket = useSocket();
  const [players, setPlayers] = useState<Players>({});
  const router = useRouter();

  const playersCopy = cloneDeep(players);

  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy;

  const leaveRoom = () => {
    socket?.emit("user-leave", myId, roomId);
    console.log("leaving room", roomId);
    peer?.disconnect();
    router.push("/home");
  };

  const toggleAudio = () => {
    console.log("I toggled my audio");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return { ...copy };
    });
    socket?.emit("user-toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    console.log("I toggled my video");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      console.log("playing:", copy[myId].playing);

      return { ...copy };
    });
    socket?.emit("user-toggle-video", myId, roomId);
  };

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  };
};

export default usePlayer;
