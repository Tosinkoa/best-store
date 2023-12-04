import Image from "next/legacy/image";
import { TbArrowNarrowRight } from "react-icons/tb";

const LandingPageShowcaseCard = () => {
  return (
    <div className="flex px-2 md:px-5 lg:px-12 my-3">
      <div
        data-aos="fade-up"
        data-aos-delay="120"
        data-aos-offset="2"
        className="relative h-[350px] md:h-[200px] w-full rounded-lg"
      >
        <div className="absolute bg-black opacity-30 z-20 flex inset-0 w-full h-full rounded-lg"></div>
        <Image
          src="/assets/images/background-color.jpg"
          alt="background-color"
          objectFit="cover"
          layout="fill"
          className="rounded-lg"
        />
        <div className="absolute grid grid-cols-1 md:grid-cols-2 w-full inset-0 justify-between lg:px-40">
          <div className="w-full text-center md:text-left justify-center flex flex-col z-30 px-6 inset-y-0 h-full space-y-3">
            <div className="relative animate-infinite-rotate h-[28vh] w-[28vh] md:h-[30vh] md:w-[30vh] z-30 flex inset-y-0 my-auto">
              <Image
                src="/assets/images/flower.png"
                alt="background-color"
                objectFit="contain"
                layout="fill"
              />
            </div>
          </div>
          <div className="w-full text-center md:text-right justify-center flex flex-col z-30 px-6 inset-y-0 h-full space-y-3 ">
            <h1 className="text-white font-bold text-xl">STYLE MEET SUBSTANCE</h1>
            <p className="font-semibold text-white">
              Breathable perforated toe stiched stealth
            </p>
            <div className="w-fit px-5 flex items-center space-x-2 bg-white py-2 rounded-full mx-auto md:mr-0">
              <span>Discover Now</span>
              <TbArrowNarrowRight className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageShowcaseCard;
