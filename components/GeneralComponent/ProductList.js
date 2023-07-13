import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import NumberFormatter from "@/components/01-Utils/NumberFormatter";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsShop } from "react-icons/bs";
import { ShopData } from "../SellerComponent/Shop/ShopData";

const ProductList = () => {
  const [overallProductFiveStar, setOverallProductFiveStar] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    for (const item of ShopData) {
      const totalStars = item.one_star * 1 + item.two_star * 2 + item.three_star * 3 + item.four_star * 4 + item.five_star * 5;

      const totalResponses = item.one_star + item.two_star + item.three_star + item.four_star + item.five_star;

      const fiveStarScore = (totalStars / totalResponses).toFixed(1);
      setOverallProductFiveStar(fiveStarScore);
      setTotalRatings(totalResponses);
    }
  }, []);

  return (
    <WebsiteMetadata>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-2 grid-cols-2 p-3">
        {ShopData?.map((eachStoreData) => {
          return (
            <div key={eachStoreData.id} className="w-full flex h-[350px] rounded-sm border shadow-md flex-col">
              <Link href="/seller-dashboard/product/1" passHref className="h-[80%] w-full relative rounded-t-sm">
                <Image src={eachStoreData.product_image} alt={eachStoreData.product_name} objectFit="cover" layout="fill" className="rounded-t-sm" />
              </Link>
              <div className="flex flex-col mt-1 py-1 px-1.5 md:px-2 relative">
                {/* Shop Location */}
                <div className="flex flex-row text-xl text-secondary-600 items-center space-x-1">
                  <BsShop className="text-sm font-bold" />
                  <div className="text-xs line-clamp-1">{eachStoreData.store_owner}</div>
                </div>
                {/* Shop Name */}
                <p className="  font-semibold text-sm line-clamp-2">{eachStoreData.product_name}</p>
                <div className=" mt-1 font-semibold gap-x-2 items-center flex flex-row text-sm">
                  <div className="flex flex-col ">
                    <p>₦{NumberFormatter(eachStoreData.price)}</p>
                    <p className="text-xs  line-through">₦{NumberFormatter(eachStoreData.discount_price)}</p>
                  </div>
                  <p className="text-xs bg-primary-300 rounded-md shadow-sm p-1 text-secondary-50">
                    {(((eachStoreData.discount_price - eachStoreData.price) / eachStoreData.discount_price) * 100).toFixed()}%
                  </p>
                </div>
                <div className="flex flex-row gap-x-2 -mt-1 items-center font-semibold">
                  <i data-star={overallProductFiveStar} className="text-lg"></i>
                  <p className="text-xs">({totalRatings})</p>
                </div>
                <button className="w-full text-center bg-primary-500 rounded-md shadow text-base font-bold py-2 text-secondary-50">Add to cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </WebsiteMetadata>
  );
};

export default ProductList;
