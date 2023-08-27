import { useEffect, useState } from "react";
import { AiFillShop, AiTwotoneSetting } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHeart, FaHistory, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import Navbar from "../Helper/Navbar";
import SidebarComponent from "../Helper/SidebarComponent";
import { getLayout as getSiteLayout } from "./Layout";

const DashboardLayout = ({ children }) => {
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const [widthIsSmall, setWidthIsSmall] = useState(true);

  useEffect(() => {
    const handleResize = () =>
      innerWidth < 1024 ? setWidthIsSmall(true) : setWidthIsSmall(false);
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  const sidebarNavButtons = [
    {
      linkParams: "/product",
      icon: <FaShoppingBag className="text-xl" />,
      name: "Shop",
    },
    {
      linkParams: "/stores",
      icon: <AiFillShop className="text-xl" />,
      name: "Stores",
    },
    {
      linkParams: "/cart",
      icon: <FaShoppingCart className="text-xl" />,
      name: "Cart",
    },
    {
      linkParams: "/sale-history",
      icon: <FaHistory className="text-xl" />,
      name: "Sale History",
    },
    {
      linkParams: "/saved-item",
      icon: <FaHeart className="text-xl" />,
      name: "Saved Item",
    },
    {
      linkParams: "/my-store",
      icon: <BsFillPersonFill className="text-xl" />,
      name: "My Store",
    },
    {
      linkParams: "/notifications",
      icon: <MdNotifications className="text-xl" />,
      name: "Notifications",
    },
    {
      linkParams: "/settings",
      icon: <AiTwotoneSetting className="text-xl" />,
      name: "Settings",
    },
  ];

  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-primary-50 dark:bg-secondary-900 overflow-hidden bottom-0 h-[100vh] font-roboto">
      <Navbar smallScreenSidebarHandler={() => setShowSmallScreenSidebar(true)} />
      <div className="flex relative w-full h-full">
        {((widthIsSmall && showSmallScreenSidebar) || !widthIsSmall) && (
          <>
            <SidebarComponent sidebarNavButtons={sidebarNavButtons} />
            {widthIsSmall && (
              <div
                className="inset-0 z-10 bg-black flex fixed opacity-60"
                onClick={() => setShowSmallScreenSidebar(false)}
              ></div>
            )}
          </>
        )}
        <div className="text-sm md:text-base mt-[55px] lg:w-[calc(100%_-_250px)] lg:ml-auto flex relative w-full h-[calc(100%_-_55px)]">
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const getLayout = (page) =>
  getSiteLayout(<DashboardLayout>{page}</DashboardLayout>);

export default DashboardLayout;
