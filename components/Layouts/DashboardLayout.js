import { useState } from "react";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardSidebar from "../Sidebars/DashboardSidebar";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import { getLayout as getSiteLayout } from "./Layout";
import { sidebarNavButtons } from "./NavigationLinks/sidebarNavButtons";

const DashboardLayout = ({ children }) => {
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const { isMediumAndSmallScreen } = useGetScreenWidth();

  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-primary-50 overflow-hidden bottom-0 min-h-[100dvh] font-roboto">
      <DashboardNavbar smallScreenSidebarHandler={() => setShowSmallScreenSidebar(true)} />
      <div className="flex relative w-full h-full">
        <>
          <DashboardSidebar
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
        <div className="text-sm md:text-base mt-[55px] lg:w-[calc(100%_-_250px)] lg:ml-auto relative w-full h-[calc(100%_-_55px)]">
          <div className="w-full h-full overflow-y-auto p-4 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const getLayout = (page) => getSiteLayout(<DashboardLayout>{page}</DashboardLayout>);

export default DashboardLayout;
