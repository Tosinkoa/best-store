import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import { getLayout } from "@/components/Layouts/ChatLayout";
import { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { PiMicrophoneFill } from "react-icons/pi";
import Image from "next/legacy/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import { MyDialog, MyImageDialog } from "@/components/01Utils/HeadlessUI";

const Chat = () => {
  const [chat, setChat] = useState("");
  const [isViewImageToSend, setisViewImageToSend] = useState(false);

  return (
    <WebsiteMetadata>
      <div className="flex flex-col gap-y-6 mb-[65px]">
        {/* Left Chat */}
        <div className="md:w-8/12 w-10/12 flex flex-col gap-y-1">
          <div className="flex p-3  rounded-bl-none w-fit bg-secondary-200 rounded-lg tracking-wide">
            Hello Ullamco
          </div>
          <p className="text-xs">10:03PM</p>
        </div>
        {/* Right Chat */}
        <div className="md:w-8/12 w-10/12 flex flex-col gap-y-1 ml-auto items-end">
          <div className="flex p-3 rounded-br-none w-fit bg-primary-700 text-secondary-50 rounded-lg">
            Hello Jaquar
          </div>
          <p className="text-xs">10:03PM · Seen</p>
        </div>
      </div>
      <div className="gap-y-2 flex-col fixed lg:ml-[550px] md:px-10 px-5 py-2  h-fit lg:w-[calc(100%_-_550px)] w-full right-0 bottom-0 bg-primary-50 flex ">
        <div className="flex items-center space-x-3 relative">
          <textarea
            type="text"
            className="resize-none w-full flex rounded-md h-11 md:h-12 bg-inherit focus:border-secondary-400 border-secondary-400 focus:outline-none focus:ring-0"
            placeholder="Enter your message..."
            onChange={(e) => setChat(e.target.value)}
            value={chat}
          />
          {chat.trim() ? (
            <div className="absolute right-3">
              <BiSolidSend className="text-4xl" />
            </div>
          ) : (
            <div className="absolute right-3">
              <PiMicrophoneFill className="text-4xl" />
            </div>
          )}
        </div>
      </div>
    </WebsiteMetadata>
  );
};

Chat.getLayout = getLayout;
export default Chat;
