import BestAppLogo from "@/components/01Utils/BestAppLogo";
import Image from "next/legacy/image";

const LoadingUIWithLogo = () => {
  return (
    <div className="flex min-h-[calc(100vh_-_55px)] w-full">
      <div className="relative inset-0 m-auto h-28 w-28">
        <Image
          src="/assets/gif/cart-animation.gif"
          alt="cart-animation"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="md:text-lg -top-5 relative font-bold pt-2 text-base text-primary-700 pl-2 h-fit items-center bg-white">
        <BestAppLogo />
      </div>
    </div>
  );
};

export default LoadingUIWithLogo;
