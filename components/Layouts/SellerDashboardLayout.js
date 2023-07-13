import { useEffect, useState } from "react";
import { AiFillShop, AiTwotoneSetting } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHeart, FaHistory, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import Navbar from "../Helper/Navbar";
import SidebarComponent from "../Helper/SidebarComponent";
import { getLayout as getSiteLayout } from "./Layout";

const SellerDashboardLayout = ({ children }) => {
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const [widthIsSmall, setWidthIsSmall] = useState(true);

  useEffect(() => {
    const handleResize = () => (innerWidth < 1024 ? setWidthIsSmall(true) : setWidthIsSmall(false));
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  const sidebarNavButtons = [
    {
      linkParams: "/seller-dashboard/product",
      icon: <FaShoppingBag className="text-2xl" />,
      name: "Shop",
    },
    {
      linkParams: "/seller-dashboard/stores",
      icon: <AiFillShop className="text-2xl" />,
      name: "Stores",
    },
    {
      linkParams: "/seller-dashboard/cart",
      icon: <FaShoppingCart className="text-2xl" />,
      name: "Cart",
    },
    {
      linkParams: "/seller-dashboard/sale-history",
      icon: <FaHistory className="text-2xl" />,
      name: "Sale History",
    },
    {
      linkParams: "/seller-dashboard/saved-item",
      icon: <FaHeart className="text-2xl" />,
      name: "Saved Item",
    },
    {
      linkParams: "/seller-dashboard/my-store",
      icon: <BsFillPersonFill className="text-2xl" />,
      name: "My Store",
    },
    {
      linkParams: "/seller-dashboard/notifications",
      icon: <MdNotifications className="text-2xl" />,
      name: "Notifications",
    },
    {
      linkParams: "/seller-dashboard/settings",
      icon: <AiTwotoneSetting className="text-2xl" />,
      name: "Settings",
    },
  ];

  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-secondary-100 dark:bg-secondary-900 overflow-hidden bottom-0 min-h-screen font-roboto">
      <Navbar smallScreenSidebarHandler={() => setShowSmallScreenSidebar(true)} />
      <div className="flex relative w-full">
        {((widthIsSmall && showSmallScreenSidebar) || !widthIsSmall) && (
          <>
            <SidebarComponent sidebarNavButtons={sidebarNavButtons} />
            {widthIsSmall && <div className="inset-0 z-10 bg-black flex fixed opacity-60" onClick={() => setShowSmallScreenSidebar(false)}></div>}
          </>
        )}
        <div className="text-sm md:text-base mt-[55px] lg:w-[calc(100%_-_300px)] lg:ml-auto flex relative w-full">
          <div className="w-full mb-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const getLayout = (page) => getSiteLayout(<SellerDashboardLayout>{page}</SellerDashboardLayout>);

export default SellerDashboardLayout;
