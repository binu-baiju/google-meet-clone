"use client";
import classNames from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";
import ReactPlayer from "react-player";

const Player = (props: any) => {
  const { playerId, url, muted, playing, isActive } = props;
  return (
    <div
      className={classNames("relative  overflow-hidden mb-5 h-full w-full", {
        "rounded-lg ": isActive,
        "rounded-md h-min w-52 shadow-md": !isActive,
        "flex items-center justify-center": !playing,
      })}
      // style={{
      //   width: "200px",
      //   height: "calc(100vh - 20px)",
      //   right: "20px",
      //   top: "20px",
      // }}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : (
        <UserSquare2 className="text-white" size={isActive ? 400 : 150} />
      )}
      {!isActive ? (
        muted ? (
          <MicOff className="text-white absolute right-2 bottom-2" size={20} />
        ) : (
          <Mic className="text-white absolute right-2 bottom-2" size={20} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
