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

/**
 * @TODO Put email confirmation message inside notification
 */

const Navbar = ({ smallScreenSidebarHandler }) => {
  const {
    data: allCartData,
    isLoading: isAllCartDataLoading,
    isError: isAllCartError,
  } = useGetBuyerCartQuery();
  const { data: loggedInUserData, isLoading: isLoggedInUserDataLoading } =
    useGetLoggedInUserQuery();

  const { isMediumAndSmallScreen } = useGetScreenWidth();
  const [totalProductInCart, setTotalProductInCart] = useState("");

  useEffect(() => {
    if (allCartData?.data?.length > 0) {
      const allProductCount = allCartData?.data?.map(
        (eachCartData) => eachCartData.product_count
      );
      const totalPrice = allProductCount.reduce((acc, num) => acc + num, 0);
      setTotalProductInCart(totalPrice);
    }
  }, [allCartData]);

  const sidebarHandler = () => {
    if (isMediumAndSmallScreen) {
      smallScreenSidebarHandler();
    }
  };

  return (
    <div className="h-[55px] lg:w-[calc(100%_-_250px)] lg:ml-[250px] justify-between z-10 w-full flex items-center px-2 md:px-5 fixed bg-inherit bg-white">
      <div className="md:text-lg lg:hidden font-bold pt-2 text-base text-primary-800 pl-2 md:ml-4 h-[55px] items-center bg-white">
        <BestAppLogo />
      </div>

      <div className="flex flex-row text-[28px] gap-x-3 items-center ml-auto w-fit">
        <Link href="/notifications" passHref className="relative">
          {/* <div className="rounded-full -right-1.5 -top-1 bg-red-600 text-secondary-50 w-6 h-6 items-center flex place-content-center absolute text-xs font-light">
            20
          </div> */}
          <IoMdNotificationsOutline className="md:text-4xl text-[32px]" />
        </Link>
        <Link href="/cart" passHref className="relative">
          {!isAllCartDataLoading && !isAllCartError && allCartData?.data?.length > 0 && (
            <div className="rounded-full -right-1.5 -top-1 bg-red-600 text-secondary-50 w-6 h-6 items-center flex place-content-center absolute text-xs font-light">
              {totalProductInCart}
            </div>
          )}
          <AiOutlineShoppingCart className="md:text-[34px] text-[32px]" />
        </Link>
        <div className=" block cursor-pointer" onClick={sidebarHandler}>
          <div className=" w-[35px] h-[35px] relative rounded-full">
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
              <HiOutlineUserCircle className="text-[2.50rem]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
