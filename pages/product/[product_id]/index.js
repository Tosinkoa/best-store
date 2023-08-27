import NumberFormatter from "@/components/01-Utils/NumberFormatter";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import Image from "next/legacy/image";
import { useState } from "react";
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const ViewProduct = () => {
  const [itemsToAdd, setItemsToAdd] = useState(1);

  const itemAmountChangeHandler = (e) => {
    if (e.target.value > 99) return;
    setItemsToAdd(e.target.value);
  };

  return (
    <div className="flex flex-col mx-auto w-[95%] md:h-[80vh] mt-4">
      <div className="grid md:grid-cols-2 md:gap-x-7 gap-y-4 w-full h-full">
        <div className="flex flex-row md:gap-x-4 gap-x-2  ">
          <div className="w-fit md:h-[60vh] h-[50vh] space-y-2 overflow-y-auto">
            {Array(10)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="relative md:h-20 h-16 w-16 md:w-24 rounded-sm"
                >
                  <Image
                    src="/assets/images/house07.jpg"
                    alt="product small image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm"
                  />
                </div>
              ))}
          </div>
          <div className="relative md:h-[60vh] h-[50vh] w-full  rounded-md">
            <Image
              src="/assets/images/house07.jpg"
              alt="product-image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-3  ">
          <div className="relative flex flex-row gap-x-2 ">
            <p className="font-semibold text-lg lg:text-2xl">
              Men's Canvas Breathable Sports Casual Running Shoes -blue
            </p>
            <div className="flex flex-col items-center font-semibold w-fit ml-auto">
              <p className="text-2xl">₦{NumberFormatter(80000)}</p>
              <div className="flex flex-row items-center">
                <i data-star="4.6" className="absolute text-lg"></i>
                <p className="font-extrabold text-base">(76)</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="md:h-[24vh] lg:h-[30vh] md:overflow-y-auto">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div className="border border-secondary-400 rounded-sm py-1 px-2 font-semibold w-fit">
            6 in stock
          </div>
          <hr />
          <div className="flex gap-x-4 items-center">
            <form>
              <input
                value={itemsToAdd}
                onChange={itemAmountChangeHandler}
                type="number"
                max={99}
                min={1}
                className="border-b font-bold px-2 text-sm border-0 focus:ring-0 focus:outline-none border-secondary-400 h-6 w-8 bg-inherit"
              />
            </form>
            <AiOutlineMinus
              onClick={() => setItemsToAdd((prev) => prev - 1)}
              className="border border-secondary-400 rounded-sm py-1 px-2 text-2xl font-semibold w-fit"
            />
            <AiOutlinePlus
              onClick={() => setItemsToAdd((prev) => prev + 1)}
              className="border border-secondary-400 rounded-sm py1 px-2 text-2xl font-semibold w-fit"
            />
            <button className="py-2 text-secondary-50 font-semibold px-3 bg-primary-800 text-xs rounded-[0.180rem]">
              ADD TO CART
            </button>
          </div>
          <div className="w-full justify-between flex items-start text-secondary-500">
            <div className="flex text-xs font-bold  items-center gap-x-1">
              <AiOutlineHeart className="text-lg" /> ADD TO WISHLIST
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold">SHARE THE PRODUCT</p>
              <div className="flex-row flex w-fit gap-x-2">
                <FaFacebookF />
                <BsTwitter />
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="flex flex-col">
        <p className=" text-lg font-semibold">Customers who viewed this also viewed</p>
        <div className="flex-row flex gap-x-3 overflow-x-auto">
          {Array(10)
            .fill()
            .map((_, index) => (
              <div className="block">
                <div className="relative h-32 w-32 rounded-md">
                  <Image
                    src="/assets/images/house01.jpg"
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

ViewProduct.getLayout = getLayout;
export default ViewProduct;
