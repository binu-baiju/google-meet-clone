import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff, Copy } from "lucide-react";
import { ToolTipCopy } from "../Tooltip/page";
import CopyToClipboard from "react-copy-to-clipboard";

const Bottom = (props: any) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom, roomId } = props;

  return (
    <div className="absolute flex justify-between bottom-5 left-0 right-0 mx-auto w-72 bg-zinc-900">
      <div
        className={`rounded-full h-12 w-12 flex items-center justify-center ${
          muted ? "bg-red-500" : "bg-gray-500"
        } `}
      >
        {muted ? (
          <MicOff
            className={cx(
              "p-4 rounded-full text-white cursor-pointer",
              "bg-secondary hover:bg-buttonPrimary"
            )}
            size={55}
            onClick={toggleAudio}
          />
        ) : (
          <Mic
            className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
            size={55}
            onClick={toggleAudio}
          />
        )}
      </div>
      <div
        className={`rounded-full h-12 w-12 flex items-center justify-center ${
          playing ? "bg-gray-500" : "bg-red-500"
        } `}
      >
        {playing ? (
          <Video
            className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
            size={55}
            onClick={toggleVideo}
          />
        ) : (
          <VideoOff
            className={cx(
              "p-4 rounded-full text-white cursor-pointer",
              "bg-secondary hover:bg-buttonPrimary"
            )}
            size={55}
            onClick={toggleVideo}
          />
        )}
      </div>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
        <PhoneOff
          size={55}
          className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
          onClick={leaveRoom}
        />
      </div>
      {/* <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-500">
        <Copy
          size={55}
          className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary "
        />
      </div> */}
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-500 hover:bg-gray-600">
        <ToolTipCopy roomId={roomId} />
      </div>
    </div>
  );
};

export default Bottom;
