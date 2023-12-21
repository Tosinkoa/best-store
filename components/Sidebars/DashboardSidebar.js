import Link from "next/link";
import { useRouter } from "next/router";
import BestAppLogo from "../01Utils/BestAppLogo";
import { BiLogOut } from "react-icons/bi";

const DashboardSidebar = ({
  sidebarNavButtons,
  isMediumAndSmallScreen,
  showSmallScreenSidebar,
}) => {
  const router = useRouter();

  return (
    <div
      className={` ${
        (isMediumAndSmallScreen && showSmallScreenSidebar) || !isMediumAndSmallScreen
          ? "translate-x-0"
          : "-translate-x-full"
      } animate ease-in-out duration-700
    fixed shadow-md lg:text-xl text-lg flex-col text-secondary-50 bg-primary-800 top-0 bottom-0 h-full overflow-y-auto z-20 lg:z-10 w-[250px] flex`}
    >
      <Link
        href="/"
        passHref
        className=" font-bold pt-2 pl-4 h-[55px] border-none shadow-none items-center"
      >
        <BestAppLogo />
      </Link>

      <div className=" flex h-full w-full flex-col relative font-semibold  py-4 gap-y-0.5">
        {sidebarNavButtons?.map((eachButton) => (
          <Link
            key={eachButton.linkParams}
            href={eachButton.linkParams}
            passHref
            className={`flex items-center gap-x-2 px-5 py-3 text-base ${
              router.pathname.includes(eachButton.linkParams) && "bg-primary-600"
            }`}
          >
            <span className="text-xl"> {eachButton.icon} </span> {eachButton.name}
          </Link>
        ))}
        <Link
          href="/auth/logout"
          passHref
          className="bg-primary-600 absolute bottom-3 flex flex-row w-11/12 mx-auto inset-x-0 space-x-2 items-center py-3 px-2 rounded-md text-base"
        >
          <BiLogOut className="text-2xl" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
