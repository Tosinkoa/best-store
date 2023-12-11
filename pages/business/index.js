import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import Image from "next/legacy/image";
import Link from "next/link";

const Stores = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-2 grid-cols-2">
      <Link
        passHref
        href="/business/1"
        className="w-full flex h-64 border text-center gap-y-2 rounded-md bg-white flex-col p-3"
      >
        {/* <BsShop className="text-9xl flex mx-auto" /> */}
        <div className="h-[150px] w-[150px] relative flex mx-auto">
          <Image
            src="/assets/images/shop_icon01.png"
            alt="shop icon"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-2 bg-primary-300 rounded-md shadow">
          <p className=" font-bold text-base md:text-lg items-center line-clamp-2 h-fit  ">
            Guandow Store
          </p>
        </div>
        <p className="text-sm">Clothes, Smart Phones, Wrist Watch, Perfume</p>
      </Link>
    </div>
  );
};

export default AuthorizeHOC(Stores, getLayout);
