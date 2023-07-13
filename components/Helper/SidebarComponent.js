import Link from "next/link";
import { useRouter } from "next/router";
import BestAppLogo from "../01-Utils/BestAppLogo";

const SidebarComponent = ({ sidebarNavButtons }) => {
  const router = useRouter();
  return (
    <div className="fixed shadow-md lg:text-xl text-lg flex-col text-secondary-50 bg-primary-600 top-0 bottom-0 h-full overflow-y-auto z-20 lg:z-10 lg:w-[300px] w-[250px] flex">
      <div className=" font-bold pt-2 pl-4 h-[55px] border-b-secondary-400 shadow-sm border-b items-center">
        <BestAppLogo />
      </div>

      <div className=" flex h-full w-full flex-col relative font-semibold  py-4 gap-y-1">
        {sidebarNavButtons?.map((eachButton) => (
          <Link
            key={eachButton.linkParams}
            href={eachButton.linkParams}
            passHref
            className={`flex items-center gap-x-4 px-5 py-3 ${router.pathname.includes(eachButton.linkParams) && "bg-primary-400"}`}
          >
            {eachButton.icon} {eachButton.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarComponent;
