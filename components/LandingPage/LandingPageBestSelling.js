import Image from "next/legacy/image";
import { ProductDummyData } from "./ProductDummyData";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiGlobeStandFill } from "react-icons/pi";
import NumberFormatter from "../01Utils/NumberFormatter";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetAllProductsQuery } from "@/store/APIs/productApi";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import Link from "next/link";
import { useState } from "react";

const LandingPageBestSelling = () => {
  const productToFetchPerRequest = 12;
  const [dataAmountToOffset, setDataAmountToOffset] = useState(0);

  const { data: allProductData, isLoading: isAllProductDataLoading } = useGetAllProductsQuery(
    {
      data_amount: productToFetchPerRequest,
      data_offset: dataAmountToOffset,
    },
    { refetchOnMountOrArgChange: dataAmountToOffset }
  );

  const fetchNextData = () => {
    setDataAmountToOffset((prevData) => prevData + productToFetchPerRequest);
  };

  const fetchPrevData = () => {
    if (dataAmountToOffset < productToFetchPerRequest) return;
    setDataAmountToOffset((prevData) => prevData - productToFetchPerRequest);
  };

  return (
    <div className="flex flex-col px-2 md:px-5 lg:px-12 my-10 md:my-12 space-y-3">
      <div className="flex flex-row items-center whitespace-nowrap space-x-2">
        <div className="flex w-fit h-fit items-center space-x-1 font-bold">
          <PiGlobeStandFill className="text-primary-700 text-2xl" />
          <p>Best Selling</p>
        </div>
        <div className="border border-gray-300 w-full"></div>
        <div className="flex flex-row items-center space-x-3">
          <button onClick={fetchPrevData} className="bg-white rounded-full p-3 text-xs">
            <IoIosArrowBack />
          </button>
          <button onClick={fetchNextData} className="bg-white rounded-full p-3 text-xs">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {allProductData?.data?.map((eachProductData) => (
          <Link
            passHref
            href="/product/[product_id]"
            as={`/product/${eachProductData.id}`}
            data-aos="fade-up"
            data-aos-delay="120"
            data-aos-offset="2"
            key={eachProductData.id}
            className="flex flex-row bg-white h-[130px] shadow-md rounded-md p-2 md:p-2 items-center space-x-4"
          >
            <div className="relative block h-[90px] w-[90px] bg-gray-100 rounded-button">
              <Image
                src={eachProductData.images[0].image_url}
                alt={eachProductData.name}
                objectFit="contain"
                layout="fill"
                // className="m-2"
              />
            </div>
            <div className="flex flex-col space-y-2.5 w-2/4">
              <p className="capitalize line-clamp-2 font-semibold text-gray-600">
                {eachProductData.name}
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
                {eachProductData.price && `₦${NumberFormatter(eachProductData.price)}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPageBestSelling;
