import Image from "next/legacy/image";
import { BsArrowRight } from "react-icons/bs";

const LandingPageBanner = () => {
  return (
    <div className="md:h-[70vh] lg:h-[80vh] h-[80vh] bg-primary-800 w-full">
      <div className="grid md:grid-cols-2 px-2 md:px-5 py-3 md:py-0 lg:px-12 h-full w-full">
        <div className="flex flex-col w-full md:w-fit gap-y-2 md:gap-y-3 h-fit my-auto text-center md:text-left text-white">
          <div className="flex flex-row items-center space-x-2 w-fit mx-auto md:w-full md:mr-auto">
            <span className="font-semibold text-2xl md:text-4xl lg:6xl">AIR MAX</span>
            <span className="border-b-2 w-12 border-white"></span>
          </div>

          <div className="text-2xl md:text-4xl lg:text-6xl font-extrabold">
            <p>NIKE AIR MAX</p>
          </div>
          <p className="text-lg font-bold"> UP TO 50% OFF</p>
          <button className="flex items-center space-x-2 rounded-full bg-white text-primary-900 font-semibold w-fit px-10 py-4 mx-auto md:ml-0">
            <span>Shop Now</span>
            <BsArrowRight />
          </button>
        </div>
        <div className="w-full h-full flex flex-col md:flex-row md:justify-between space-y-3 md:space-y-0 items-center">
          <div className="mx-auto md:mr-auto w-fit h-full animate-breathing-shoe">
            <div className="relative lg:mt-10 h-full w-[40vw] -rotate-12">
              <Image
                src="/assets/images/nike-shoe.png"
                alt="shoe-image"
                layout="fill"
                objectFit="contain"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageBanner;
