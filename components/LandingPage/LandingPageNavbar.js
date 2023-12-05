import { useGetAuthQuery } from "@/store/APIs/authenticationApi";
import { useGetBuyerCartQuery } from "@/store/APIs/cartApi";
import { useGetLoggedInUserQuery } from "@/store/APIs/userApi";
import { Menu } from "@headlessui/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import BestAppLogo from "../01Utils/BestAppLogo";
import useGetCartCount from "../ReusableHooks/CartHooks/useGetCartCount";
/**
 * @TODO Put email confirmation message inside notification
 */

const LandingPageNavbar = ({ smallScreenSidebarHandler }) => {
  const { data: loggedInUserData, isLoading: isLoggedInUserDataLoading } =
    useGetLoggedInUserQuery();
  const {
    data: allCartData,
    isLoading: isAllCartDataLoading,
    isError: isAllCartError,
  } = useGetBuyerCartQuery();

  const {
    isSuccess: isUserAuthenticatedSuccessfully,
    isLoading: isUserAuthenticatedLoading,
    isError: isUserAuthenticatedError,
  } = useGetAuthQuery();

  const { totalProductInCart, localStorageCartProductCount } = useGetCartCount(
    allCartData,
    isUserAuthenticatedLoading,
    isUserAuthenticatedError
  );

  return (
    <div className="z-40 w-full flex px-2 md:px-5 lg:px-12 fixed bg-white border-b">
      <div className="justify-between w-full items-center h-[55px] flex">
        <div className=" pt-2 text-base text-gray-800  h-[55px] items-center bg-white space-x-4 lg:space-x-6 flex">
          <div className="md:text-2xl ">
            <BestAppLogo />
          </div>
          <BiSearch className="inset-0 flex lg:hidden my-auto text-3xl text-black" />
          <div className="w-fit relative hidden md:flex rounded-lg">
            <BiSearch className="absolute inset-0 my-auto ml-4 text-xl text-gray-500" />
            <input
              type="search"
              className="font-semibold placeholder:truncate placeholder:text-xs placeholder:font-medium w-[92%] text-xs pl-10 lg:w-64 md:w-[24rem] rounded-full h-9 border focus:ring-primary-400"
              placeholder="Search for shoes, clothes, phones..."
            />
          </div>
        </div>
        <div className="flex flex-row md:text-sm text-xs gap-x-5 items-center ml-auto w-fit">
          <div className="flex items-center space-x-5">
            <div className="w-fit space-x-5 lg:flex hidden">
              <Menu as="div" className="relative">
                <Menu.Button className="flex relative items-center hover:underline cursor-pointer">
                  <p>Appliances</p>
                </Menu.Button>
                <Menu.Items className="h-60 w-60 rounded-lg border shadow-md">
                  <Menu.Item> Hello</Menu.Item>
                </Menu.Items>
              </Menu>
              <div className="flex items-center hover:underline cursor-pointer">
                <p>Health & Beauty</p>
              </div>
              <div className="flex items-center hover:underline cursor-pointer">
                <p>Computing</p>
              </div>
              <div className="flex items-center hover:underline cursor-pointer">
                <p>Fashion</p>
              </div>
              <div className="flex items-center hover:underline cursor-pointer">
                <p>Other Categories</p>
              </div>
            </div>
            <div className="w-fit space-x-3 flex">
              {!isUserAuthenticatedLoading && isUserAuthenticatedError && (
                <Link
                  href="/auth/login"
                  passHref
                  className="text-xs hover:bg-primary-100 cursor-pointer border border-gray-400 px-4 py-2 rounded"
                >
                  <p>Log In</p>
                </Link>
              )}
              {!isUserAuthenticatedLoading && isUserAuthenticatedError && (
                <Link
                  href="/auth/register"
                  passHref
                  className="text-xs hover:bg-primary-100 cursor-pointer border border-gray-400 px-4 py-2 rounded"
                >
                  <p>Sign up</p>
                </Link>
              )}
              {!isUserAuthenticatedLoading && isUserAuthenticatedSuccessfully && (
                <Link
                  href="/auth/logout"
                  passHref
                  className="text-xs hover:bg-primary-100 cursor-pointer border border-gray-400 px-4 py-2 rounded"
                >
                  <p>Logout</p>
                </Link>
              )}
            </div>
            <Link href="/cart" passHref className="relative">
              {!isUserAuthenticatedLoading &&
                isUserAuthenticatedError &&
                localStorageCartProductCount && (
                  <div className="rounded-full -right-1.5 -top-1 bg-red-600 text-secondary-50 w-6 h-6 items-center flex place-content-center absolute text-xs font-light">
                    {localStorageCartProductCount}
                  </div>
                )}
              {!isUserAuthenticatedLoading &&
                isUserAuthenticatedSuccessfully &&
                !isAllCartDataLoading &&
                !isAllCartError &&
                allCartData?.data?.length > 0 && (
                  <div className="rounded-full -right-1.5 -top-1 bg-red-600 text-secondary-50 w-6 h-6 items-center flex place-content-center absolute text-xs font-light">
                    {totalProductInCart}
                  </div>
                )}
              <AiOutlineShoppingCart className="md:text-[34px] text-[32px] text-gray-600" />
            </Link>
          </div>
          <div className=" block cursor-pointer">
            <div className=" w-[32px] h-[32px] relative rounded-full">
              {loggedInUserData?.data?.profile_picture && (
                <Image
                  src={loggedInUserData?.data?.profile_picture}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              )}
              {(!loggedInUserData?.data?.profile_picture || isLoggedInUserDataLoading) && (
                <HiOutlineUserCircle className="text-[2.30rem] text-gray-800" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
