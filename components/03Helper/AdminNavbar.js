import { useGetBuyerCartQuery } from "@/store/APIs/cartApi";
import { useGetLoggedInUserQuery } from "@/store/APIs/userApi";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import BestAppLogo from "../01Utils/BestAppLogo";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * @TODO Put email confirmation message inside notification
 */

const AdminNavbar = ({ smallScreenSidebarHandler }) => {
  const router = useRouter();
  const adminRoute = router.pathname.includes("admin-dashboard");

  return (
    <div className="h-[55px] lg:w-[calc(100%_-_250px)] lg:ml-[250px] justify-between z-10 w-full flex items-center px-2 md:px-5 fixed bg-inherit bg-white">
      <div
        className={`md:text-lg lg:hidden font-bold pt-2 ${
          adminRoute ? "text-xl" : "text-base"
        } text-primary-800 pl-2 md:ml-4 h-[55px] items-center bg-white`}
      >
        {adminRoute ? "Admin Dashboard" : <BestAppLogo />}
      </div>

      <div className="flex flex-row text-[28px] gap-x-3 items-center ml-auto w-fit">
        <Link href="/admin-dashboard/notifications" passHref className="relative">
          {/* <div className="rounded-full -right-1.5 -top-1 bg-red-600 text-secondary-50 w-6 h-6 items-center flex place-content-center absolute text-xs font-light">
            20
          </div> */}
          <IoMdNotificationsOutline className="md:text-4xl text-[32px]" />
        </Link>
        <div className=" block cursor-pointer">
          <div className=" w-[35px] h-[35px] relative rounded-full">
            {/* {loggedInUserData?.data?.profile_picture && ( */}
            <Image
              src="/assets/images/girl.jpg"
              alt="profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            {/* )} */}
            {/* {(!loggedInUserData?.data?.profile_picture || isLoggedInUserDataLoading) && (
              <HiOutlineUserCircle className="text-[2.50rem]" />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
