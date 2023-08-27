import Link from "next/link";
import { useRouter } from "next/router";
import BestAppLogo from "../01-Utils/BestAppLogo";

const SidebarComponent = ({ sidebarNavButtons }) => {
  const router = useRouter();
  return (
    <div className="fixed shadow-md lg:text-xl text-lg flex-col text-secondary-50 bg-primary-800 top-0 bottom-0 h-full overflow-y-auto z-20 lg:z-10 w-[250px] flex">
      <div className=" font-bold pt-2 pl-4 h-[55px] border-b-secondary-400 shadow-sm border-b items-center">
        <BestAppLogo />
      </div>

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
            {eachButton.icon} {eachButton.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarComponent;
