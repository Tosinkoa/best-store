import { useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsBellFill, BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { FaFileAlt, FaHeart, FaHistory, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { MdBusinessCenter, MdNotifications } from "react-icons/md";
import AdminNavbar from "../03Helper/AdminNavbar";
import SidebarComponent from "../03Helper/SidebarComponent";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import { getLayout as getSiteLayout } from "./Layout";

const AdminDashboardLayout = ({ children }) => {
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const { isMediumAndSmallScreen } = useGetScreenWidth();

  const sidebarNavButtons = [
    {
      linkParams: "/admin-dashboard/overview",
      icon: <FaFileAlt />,
      name: "Overview",
    },
    {
      linkParams: "/admin-dashboard/products",
      icon: <FaProductHunt />,
      name: "Products",
    },
    {
      linkParams: "/admin-dashboard/businesses",
      icon: <MdBusinessCenter />,
      name: "Businesses",
    },
    {
      linkParams: "/admin-dashboard/carts",
      icon: <FaShoppingCart />,
      name: "Carts",
    },
    {
      linkParams: "/admin-dashboard/saved-items",
      icon: <FaHeart />,
      name: "Saved Items",
    },
    {
      linkParams: "/admin-dashboard/notifications",
      icon: <BsBellFill />,
      name: "Notifications",
    },
    {
      linkParams: "/admin-dashboard/settings",
      icon: <AiTwotoneSetting />,
      name: "Settings",
    },
  ];

  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-primary-50 overflow-hidden bottom-0 h-[100vh] font-roboto">
      <AdminNavbar smallScreenSidebarHandler={() => setShowSmallScreenSidebar(true)} />
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

export const getLayout = (page) =>
  getSiteLayout(<AdminDashboardLayout>{page}</AdminDashboardLayout>);

export default AdminDashboardLayout;
