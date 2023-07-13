import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/legacy/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import BestAppLogo from "../01-Utils/BestAppLogo";

const Navbar = ({ smallScreenSidebarHandler }) => {
  return (
    <div className="h-[55px] lg:w-[calc(100%_-_300px)] lg:ml-[300px] justify-between z-10 w-full shadow-md flex items-center px-2 md:px-5 fixed bg-inherit">
      <div className="md:text-lg lg:hidden font-bold pt-2 text-base text-primary-600 pl-2 md:ml-4 h-[55px]  shadow-sm border-b items-center">
        <BestAppLogo />
      </div>

      <div className="flex flex-row text-[28px] gap-x-3 md:gap-x-5 items-center ml-auto w-fit">
        <div className="relative">
          <div className="rounded-full -right-1 bg-red-600 text-secondary-50 w-5 h-5 items-center flex place-content-center absolute text-xs">
            20
          </div>
          <IoMdNotificationsOutline className="md:text-4xl text-[32px]" />
        </div>
        <div className="relative">
          <div className="rounded-full -right-1 bg-red-600 text-secondary-50 w-5 h-5 items-center flex place-content-center absolute text-xs">
            3
          </div>

          <AiOutlineShoppingCart className="md:text-[34px] text-[32px]" />
        </div>
        <div className=" block">
          <div className="md:h-[40px] md:w-[40px] w-[37px] h-[37px]  relative rounded-full ">
            <Image
              src="/assets/images/lady.jpg"
              alt="archware-facility-lease-logo"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
        <AiOutlineMenu
          onClick={() => smallScreenSidebarHandler()}
          className=" lg:hidden md:text-3xl text-[28px]"
        />
      </div>
    </div>
  );
};

export default Navbar;
