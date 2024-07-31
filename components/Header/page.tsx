import { CircleHelp, MessageSquareWarning, Settings } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {
  currentTime: string;
}

const Header: FC<HeaderProps> = ({ currentTime }) => {
  return (
    <>
      <div className="w-full text-neutral-600 flex justify-between h-16">
        <div className=" flex items-center h-16 pl-6">
          <Image
            src="/pngwing.com.png"
            width={40}
            height={40}
            alt="Picture of the author"
            className="mr-1"
          />
          <span className="text-2xl font-semibold   mr-1">Google</span>
          <span className="text-2xl text-bold ">Meet</span>
        </div>
        <div className="flex items-center h-16 pr-6">
          <div className="mr-1 flex">
            <span className="mr-4 lg:mr-8 text-lg">{currentTime}</span>{" "}
            <CircleHelp className="mr-4 lg:mr-8" />
            <MessageSquareWarning className="mr-4 lg:mr-8" />
            <Settings />
          </div>
          <div className="flex"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
