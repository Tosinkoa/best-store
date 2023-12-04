import { TiFlash } from "react-icons/ti";
import NumberFormatter from "../01Utils/NumberFormatter";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/legacy/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingPageFlashDeals = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  return (
    <div className="px-2 md:px-5 lg:px-12 my-3">
      <div className="bg-white shadow-md rounded-lg flex flex-col py-8 px-3 md:px-6 md:flex space-y-3">
        <div className="flex flex-row items-center">
          <TiFlash className="text-2xl text-primary-700" />
          <div className="text-lg font-semibold">Flash Deals</div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="landing_page_flash_deals_items">
            <div className="flex flex-col space-y-2">
              <h1>Playstation 4 Game Pro</h1>
              <p className="price">₦{NumberFormatter(500000)}</p>
              <div className="flex flex-row space-x-2 items-center text-xs">
                <p>BUY NOW</p>
                <span className="h-fit w-fit bg-primary-700 text-white rounded-full p-1 text-sm">
                  <MdKeyboardArrowRight />
                </span>
              </div>
            </div>
            <div className="relative scale-125 md:scale-100 h-[28vh] w-[28vw]">
              <Image
                src="/assets/images/ps4-picture.png"
                alt="ps4 image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="landing_page_flash_deals_items">
            <div className="flex flex-col space-y-2">
              <h1>Smart Speakers for Music Lovers</h1>
              <p className="price">₦{NumberFormatter(500000)}</p>
              <div className="flex flex-row space-x-2 items-center text-xs">
                <p>BUY NOW</p>
                <span className="h-fit w-fit bg-primary-700 text-white rounded-full p-1 text-sm">
                  <MdKeyboardArrowRight />
                </span>
              </div>
            </div>
            <div className="relative scale-125 md:scale-100 h-[28vh] w-[28vw]">
              <Image
                src="/assets/images/speaker.png"
                alt="ps4 image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="landing_page_flash_deals_items">
            <div className="flex flex-col space-y-2">
              <h1>The Pro Stage for Your Home</h1>
              <p className="price">₦{NumberFormatter(500000)}</p>
              <div className="flex flex-row space-x-2 items-center text-xs">
                <p>BUY NOW</p>
                <span className="h-fit w-fit bg-primary-700 text-white rounded-full p-1 text-sm">
                  <MdKeyboardArrowRight />
                </span>
              </div>
            </div>
            <div className="relative scale-125 md:scale-100 h-[28vh] w-[28vw]">
              <Image
                src="/assets/images/smart-tv.png"
                alt="ps4 image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFlashDeals;
