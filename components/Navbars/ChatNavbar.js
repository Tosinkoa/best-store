import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { HiVideoCamera } from "react-icons/hi";
import Image from "next/legacy/image";
import { IoIosArrowRoundBack, IoMdArrowBack } from "react-icons/io";

/**
 * @TODO Put email confirmation message inside notification
 */

const ChatNavbar = () => {
  return (
    <div className="h-[55px] lg:w-[calc(100%_-_550px)] right-0 lg:ml-[250px] justify-between z-10 w-full flex items-center px-2 md:px-5 fixed bg-inherit bg-white">
      <>
        <div className="flex items-center gap-x-2">
          <IoMdArrowBack className="text-4xl text-secondary-500 md:hidden flex" />
          <div className="flex flex-row items-center gap-x-3">
            <div className=" block cursor-pointer">
              <div className=" w-[35px] h-[35px] relative rounded-full">
                <Image
                  src="/assets/images/girl.jpg"
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <p className="font-semibold text-lg text-secondary-600">Seun Maggi</p>
          </div>
        </div>
        <div className="flex flex-row text-[28px] gap-x-5 lg:gap-x-6 items-center ml-auto pr-4 w-fit">
          <div className="cursor-pointer w-fit h-fit relative rounded-full text-secondary-500">
            <HiVideoCamera className="text-[2.28rem]" />
          </div>
          <div className="cursor-pointer w-fit h-fit relative rounded-full text-secondary-500">
            <FaPhoneAlt className="text-2xl" />
          </div>
          <div className="cursor-pointer w-fit h-fit relative rounded-full text-secondary-500">
            <BsThreeDotsVertical className="text-[1.7rem]" />
          </div>
        </div>
      </>
    </div>
  );
};

export default ChatNavbar;
