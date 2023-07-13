import { useEffect, useState } from "react";
import Navbar from "../Helper/Navbar";
import SidebarComponent from "../Helper/SidebarComponent";
import { getLayout as getSiteLayout } from "./Layout";

const BuyerDashboardLayout = ({ children }) => {
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const [widthIsSmall, setWidthIsSmall] = useState(true);

  useEffect(() => {
    const handleResize = () => (innerWidth < 1024 ? setWidthIsSmall(true) : setWidthIsSmall(false));
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-secondary-100 dark:bg-secondary-900 overflow-hidden bottom-0 min-h-screen font-roboto">
      <Navbar smallScreenSidebarHandler={() => setShowSmallScreenSidebar(true)} />
      <div className="flex relative w-full">
        {((widthIsSmall && showSmallScreenSidebar) || !widthIsSmall) && (
          <>
            <SidebarComponent />
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

export const getLayout = (page) => getSiteLayout(<BuyerDashboardLayout>{page}</BuyerDashboardLayout>);

export default BuyerDashboardLayout;
