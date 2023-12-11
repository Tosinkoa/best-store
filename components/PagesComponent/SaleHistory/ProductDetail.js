import NumberFormatter from "@/components/01Utils/NumberFormatter";
import Image from "next/legacy/image";
import { useState } from "react";
import { AiFillStar, AiOutlineClose, AiOutlineStar } from "react-icons/ai";

const ProductDetail = () => {
  const [showProductCardDetail, setShowProductCardDetail] = useState(false);
  const ratings = 2;
  return (
    <div>
      <button
        onClick={() => setShowProductCardDetail(true)}
        className="bg-primary-800 shadow-sm ring-1 ring-primary-400 rounded-md px-2 py-1 font-semibold text-secondary-50"
      >
        View
      </button>
      {showProductCardDetail && (
        <>
          <div
            onClick={() => setShowProductCardDetail(false)}
            className="lg:left-[250px] fixed inset-0 bg-black opacity-60"
          ></div>
          <div className="space-y-2 fixed inset-0 m-auto lg:left-[250px] h-96 p-4 w-10/12 md:w-2/4 lg:w-4/12 bg-secondary-50 rounded-md">
            <div className="w-full justify-between border-b pb-2 items-center flex">
              <p className="font-semibold text-xl  text-primary-700">Product Details</p>
              <AiOutlineClose
                className="text-2xl cursor-pointer"
                onClick={() => setShowProductCardDetail(false)}
              />
            </div>
            <div className="relative h-40 w-40 rounded-md mx-auto">
              <Image
                src="/assets/images/jsaas.png"
                alt="product image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <p className="mx-auto flex w-fit font-bold">Vacuum for cleaning the house</p>
            <div className="flex flex-col">
              <div>
                <span>Price:</span> <span>₦{NumberFormatter(340000)}</span>
              </div>
              <div>
                <span>Buyer:</span> <span>John Manno</span>
              </div>
              <div>
                <span>Date:</span> <span>20, June 2034. 12:44pm</span>
              </div>
              <div className="flex flex-row items-center">
                <span>Ratings:</span>{" "}
                <span className="flex flex-row text-lg">
                  {ratings >= 1 ? <AiFillStar /> : <AiOutlineStar />}
                  {ratings >= 2 ? <AiFillStar /> : <AiOutlineStar />}
                  {ratings >= 3 ? <AiFillStar /> : <AiOutlineStar />}
                  {ratings >= 4 ? <AiFillStar /> : <AiOutlineStar />}
                  {ratings === 5 ? <AiFillStar /> : <AiOutlineStar />}
                </span>
              </div>
              <div>
                <span>Review:</span> <span>Really good product</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
