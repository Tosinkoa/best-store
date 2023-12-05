import { useState } from "react";
import { AiFillShop, AiTwotoneSetting } from "react-icons/ai";
import { BsBellFill, BsFillPersonFill } from "react-icons/bs";
import { FaHeart, FaHistory, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import Navbar from "../03Helper/Navbar";
import SidebarComponent from "../03Helper/SidebarComponent";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import { getLayout as getSiteLayout } from "./Layout";

const DashboardLayout = ({ children }) => {
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const { isMediumAndSmallScreen } = useGetScreenWidth();

  const sidebarNavButtons = [
    {
      linkParams: "/product",
      icon: <FaShoppingBag />,
      name: "Shop",
    },
    {
      linkParams: "/business",
      icon: <AiFillShop />,
      name: "Business",
    },
    {
      linkParams: "/cart",
      icon: <FaShoppingCart />,
      name: "Cart",
    },
    {
      linkParams: "/sale-history",
      icon: <FaHistory />,
      name: "Sale History",
    },
    {
      linkParams: "/saved-item",
      icon: <FaHeart />,
      name: "Saved Item",
    },
    {
      linkParams: "/my-business",
      icon: <BsFillPersonFill />,
      name: "My Business",
    },
    {
      linkParams: "/notifications",
      icon: <BsBellFill />,
      name: "Notifications",
    },
    {
      linkParams: "/settings",
      icon: <AiTwotoneSetting />,
      name: "Settings",
    },
  ];

  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-primary-50 overflow-hidden bottom-0 h-[100vh] font-roboto">
      <Navbar smallScreenSidebarHandler={() => setShowSmallScreenSidebar(true)} />
      <div className="flex relative w-full h-full">
        <>
          <SidebarComponent
            sidebarNavButtons={sidebarNavButtons}
            isMediumAndSmallScreen={isMediumAndSmallScreen}
            showSmallScreenSidebar={showSmallScreenSidebar}
          />

          {isMediumAndSmallScreen && showSmallScreenSidebar && (
            <div
              className="inset-0 z-10 bg-black flex fixed opacity-60"
              onClick={() => setShowSmallScreenSidebar(false)}
            ></div>
          )}
        </>
        <div className="text-sm md:text-base mt-[55px] lg:w-[calc(100%_-_250px)]  lg:ml-auto flex relative w-full h-[calc(100%_-_55px)]">
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const getLayout = (page) => getSiteLayout(<DashboardLayout>{page}</DashboardLayout>);

export default DashboardLayout;
