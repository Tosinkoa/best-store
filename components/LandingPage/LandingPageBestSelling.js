import Image from "next/legacy/image";
import { ProductDummyData } from "./ProductDummyData";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiGlobeStandFill } from "react-icons/pi";
import NumberFormatter from "../01Utils/NumberFormatter";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LandingPageBestSelling = () => {
  return (
    <div className="flex flex-col px-2 md:px-5 lg:px-12 my-10 md:my-12 space-y-3">
      <div className="flex flex-row items-center whitespace-nowrap space-x-2">
        <div className="flex w-fit h-fit items-center space-x-1 font-bold">
          <PiGlobeStandFill className="text-primary-700 text-2xl" />
          <p>Best Selling</p>
        </div>
        <div className="border border-gray-300 w-full"></div>
        <div className="flex flex-row items-center space-x-3">
          <button className="bg-white rounded-full p-3 text-xs">
            <IoIosArrowBack />
          </button>
          <button className="bg-white rounded-full p-3 text-xs">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {ProductDummyData.map((eachBestSellingProduct) => (
          <div
            data-aos="fade-up"
            data-aos-delay="120"
            data-aos-offset="2"
            key={eachBestSellingProduct.id}
            className="flex flex-row bg-white h-[130px] shadow-md rounded-md p-2 md:p-3 items-center space-x-4"
          >
            <div className="relative block  h-[90px] w-[90px] bg-gray-100 rounded-button">
              <Image
                src={eachBestSellingProduct.productImage}
                alt={eachBestSellingProduct.productName}
                objectFit="contain"
                layout="fill"
                className="m-3"
              />
            </div>
            <div className="flex flex-col space-y-3 w-2/4">
              <p className="capitalize truncate font-semibold text-gray-600">
                {eachBestSellingProduct.productName}
              </p>
              <div className="flex flex-row">
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={index}>
                      <AiFillStar className="text-yellow-500" />
                    </div>
                  ))}
                <AiOutlineStar />
              </div>
              <p className="font-bold text-green-600">
                ₦{NumberFormatter(eachBestSellingProduct.productPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageBestSelling;
