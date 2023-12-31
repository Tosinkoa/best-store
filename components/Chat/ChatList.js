import Image from "next/legacy/image";
import ChatMessage from "./ChatMessage.json";
import { useState } from "react";

const ChatList = () => {
  const [chatId, setChatId] = useState("");

  return (
    <div className=" flex flex-col h-full py-3 p-2">
      {ChatMessage?.map((eachUserMessage) => (
        <div
          onClick={() => setChatId(eachUserMessage.id)}
          key={eachUserMessage.id}
          className={`px-2 ${chatId === eachUserMessage.id && "bg-primary-200"}`}
        >
          <div className="h-20 w-full border-b py-2 items-center flex flex-row gap-x-4 ">
            <div className="block relative">
              <div className="h-12 w-12 rounded-full relative">
                <Image
                  src="/assets/images/lady.jpg"
                  objectFit="cover"
                  layout="fill"
                  alt="users-profile"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex-col w-[100%] space-y-1.5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{eachUserMessage.name}</h3>
                <p className=" text-secondary-500 text-xs">{eachUserMessage.time}</p>
              </div>
              <div className="table w-[100%] before:table-column before:w-[100%]">
                <p className="table-cell font-medium max-w-[1px] whitespace-nowrap text-ellipsis overflow-hidden">
                  {eachUserMessage.message}
                </p>
                <p className="rounded-full h-6 w-6 items-center flex place-content-center text-sm text-secondary-50 bg-red-500">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
