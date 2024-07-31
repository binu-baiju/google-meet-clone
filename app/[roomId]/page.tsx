"use client";
import Player from "@/components/Player/page";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hooks/useMediaStream";
import usePlayer, { Players, PlayerState } from "@/hooks/usePlayer";

import usePeer from "@/hooks/usePeer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Bottom from "@/components/Bottom/page";
import { cloneDeep } from "lodash";

interface UserCall {
  url: MediaStream; // Update this based on your actual MediaStream type
  muted: boolean;
  playing: boolean;
}

type CallType = any; // Define the type of call as needed
type UsersState = {
  [key: string]: CallType;
};

const Room = ({ params }: { params: { roomId: string } }) => {
  console.log(params?.roomId);
  let roomId = params?.roomId;
  const socket = useSocket();
  //   const [stream, setStream] = useState<MediaStream | null>(null);

  const { peer, myId } = usePeer(roomId);

  const { stream } = useMediaStream();

  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);

  // const [users, setUsers] = useState<{ [userId: string]: UserCall }>([]);
  const [users, setUsers] = useState<UsersState>({});

  useEffect(() => {
    console.log("hoi");
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUser: any) => {
      console.log(`user connected in room with userId ${newUser}`);

      console.log("calling");
      const call = peer.call(newUser, stream);
      console.log("called");

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);

        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev: any) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream) return;
    console.log(" incoming call");

    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);

        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev: any) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
    console.log(" incoming call attend");
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);

    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));

    console.log("players:", players);
  }, [myId, setPlayers, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId: string) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId: string) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId: string) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket]);
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      {stream ? (
        <div className="h-full w-full bg-green-500">
          <div
            className="absolute w-11/12 h-3/5 lg:h-4/5 top-[20px] left-0 right-0 mx-auto mt-28 lg:mt-12 "
            // style={{
            //   top: "20px",
            //   bottom: "50px",
            //   height: "calc(100vh - 20px - 100px)",
            // }}
          >
            {playerHighlighted && (
              <Player
                url={playerHighlighted.url}
                muted={playerHighlighted.muted}
                playing={playerHighlighted.playing}
                isActive
              />
            )}
          </div>
          <Bottom
            muted={playerHighlighted?.muted}
            playing={playerHighlighted?.playing}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            leaveRoom={leaveRoom}
            roomId={roomId}
          />
          <div
            className="absolute flex flex-col"
            style={{
              width: "200px",
              height: "calc(100vh - 20px)",
              right: "20px",
              top: "20px",
            }}
          >
            {Object.keys(nonHighlightedPlayers).map((playerId) => {
              const { url, muted, playing } = players[playerId];
              return (
                <Player
                  key={playerId}
                  url={url}
                  muted={muted}
                  playing={playing}
                  isActive={false}
                />
              );
            })}
          </div>

          {/* // <Player url={stream} muted playing playerId={myId} /> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Room;
