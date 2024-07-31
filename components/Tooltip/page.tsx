import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

import { FC } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useToast } from "../ui/use-toast";

interface TooltipProps {
  roomId: any;
}

export function ToolTipCopy({ roomId }: TooltipProps) {
  const { toast } = useToast();
  const notifyCopy = () =>
    toast({
      description: "RoomID copied to clipboard",
    });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* <Button variant="outline"> */}
          <div className="rounded-full h-12 w-12 flex items-center justify-center  hover:bg-gray-600 ">
            <CopyToClipboard
              text={roomId}
              onCopy={() =>
                toast({
                  description: "RoomID copied to clipboard",
                })
              }
            >
              <Copy
                size={48}
                className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary "
              />
            </CopyToClipboard>
          </div>
          {/* </Button> */}
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy RoomID</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
