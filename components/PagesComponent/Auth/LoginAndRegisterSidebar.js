import Image from "next/legacy/image";
import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BestAppLogo from "@/components/01Utils/BestAppLogo";

const LoginAndRegisterSidebar = ({ children }) => {
  const SampleNextArrow = ({ onClick }) => {
    return (
      <div
        className="border absolute z-50 rounded-full bottom-4 items-center right-4 text-secondary-50 border-secondary-50 p-3"
        onClick={onClick}
      >
        <AiOutlineArrowRight className="text-xl " />
      </div>
    );
  };

  const SamplePrevArrow = ({ onClick }) => {
    return (
      <div
        className="border absolute z-50 rounded-full bottom-4 items-center right-20 text-secondary-50 border-secondary-50 p-3"
        onClick={onClick}
      >
        <AiOutlineArrowLeft className="text-xl " />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const previewImages = [
    {
      image: "/assets/images/best-store1.jpg",
      text: "Shop with Ease",
    },
    {
      image: "/assets/images/best-store2.jpg",
      text: "Make Payment Online",
    },
    {
      image: "/assets/images/best-store3.jpg",
      text: "Customer Service Support",
    },
  ];
  return (
    <div className="grid md:grid-cols-7 h-[100dvh] overflow-hidden">
      <div className="md:col-span-4 hidden md:block h-[100dvh] relative">
        <Link
          href="/"
          passHref
          className="absolute z-20 text-secondary-100 top-5 left-5 text-2xl"
        >
          <BestAppLogo />
        </Link>
        <Slider {...settings}>
          {previewImages?.map((eachPreviewData, index) => (
            <div key={index} className="h-[100dvh] w-full relative">
              <div className="absolute inset-0 bg-black opacity-50 flex z-10"></div>
              <p className="absolute inset-0 w-10/12 h-fit m-auto text-secondary-100 z-10 flex font-medium text-xl lg:text-3xl text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              </p>
              <p className="text-secondary-100 absolute font-bold text-xl lg:text-2xl z-10 bottom-4 left-4">
                {eachPreviewData.text}
              </p>
              <Image
                src={eachPreviewData.image}
                alt="preview image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:col-span-3 w-full h-full items-center">{children}</div>
    </div>
  );
};

export default LoginAndRegisterSidebar;
