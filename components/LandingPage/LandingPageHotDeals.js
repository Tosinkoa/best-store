import Image from "next/legacy/image";
import { BsFire } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import NumberFormatter from "../01Utils/NumberFormatter";
import { ProductDummyData } from "./ProductDummyData";

const LandingPageHotDeals = () => {
  
  return (
    <div className="flex flex-col md:px-5 lg:px-12 my-10 md:my-12 space-y-3 px-3">
      <div className="flex flex-row items-center whitespace-nowrap space-x-2">
        <div className="flex w-fit h-fit items-center space-x-1 font-bold">
          <BsFire className="text-primary-700 text-2xl" />
          <p>Hot Deals</p>
        </div>
        <div className="border border-gray-300 w-full"></div>
        <div className="">Top 10</div>
        <div className="border border-gray-300 w-[10%]"></div>
        <button className="bg-gray-200 rounded-sm px-3 md:px-6 py-2 text-xs">SEE ALL</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {ProductDummyData.map((eachHotDealProduct) => (
          <div
            data-aos="fade-up"
            data-aos-delay="120"
            data-aos-offset="2"
            key={eachHotDealProduct.id}
            className="flex flex-col shadow-md bg-white w-full h-[300px] rounded-md"
          >
            <div className="relative h-[50vh] w-full px-3">
              <Image
                src={eachHotDealProduct.productImage}
                alt={eachHotDealProduct.productName}
                layout="fill"
                objectFit="contain"
                className="scale-75"
              />
            </div>
            <div className="flex border border-primary-50 h-[15vh]">
              <div className="flex flex-col p-2 space-y-3">
                <div className="flex flex-row">
                  <p className="line-clamp-2 font-semibold text-gray-500">
                    {eachHotDealProduct.productName}
                  </p>
                  <FaCartArrowDown className="text-3xl text-gray-600 cursor-pointer" />
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold">
                    ₦{NumberFormatter(eachHotDealProduct.productPrice)}
                  </p>

                  <p className="line-through text-xs">
                    ₦{NumberFormatter(eachHotDealProduct.productCrossedOutPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageHotDeals;
