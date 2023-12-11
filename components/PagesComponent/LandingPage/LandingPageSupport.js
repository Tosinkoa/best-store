import Image from "next/legacy/image";
import { BsSend } from "react-icons/bs";
import { TbArrowNarrowRight } from "react-icons/tb";

const LandingPageSupport = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="120"
      data-aos-offset="2"
      className="flex px-2 md:px-5 lg:px-12 my-3"
    >
      <div className="relative h-[250px] md:h-[200px] w-full rounded-lg">
        <div className="absolute bg-black opacity-30 z-20 flex inset-0 w-full h-full rounded-lg"></div>
        <div className="inset-0 w-full h-full absolute bg-gradient-to-t from-primary-500 to-blue-300 rounded-lg"></div>
        <div className="absolute grid grid-cols-1 md:grid-cols-2 w-full inset-0 justify-between lg:px-40">
          <div className="w-full text-center md:text-left justify-center flex flex-col z-30 px-6 inset-y-0 h-full space-y-3">
            <p className="font-medium text-white md:text-2xl">
              Breathable perforated toe stiched stealth
            </p>
            <h1 className="text-white font-bold md:text-4xl text-2xl">STYLE MEET SUBSTANCE</h1>
          </div>
          <div className="h-fit my-auto w-[80%] md:w-full z-30 relative flex inset-y-0 mx-auto">
            <input
              className="w-full bg-white rounded-full h-12 "
              placeholder="Type your email here..."
            />
            <div className="bg-primary-800 text-white rounded-full p-3 absolute right-2 my-auto inset-y-0 h-fit">
              <BsSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSupport;
