import NumberFormatter from "@/components/01-Utils/NumberFormatter";
import { getLayout } from "@/components/Layouts/SellerDashboardLayout";
import { Form, Formik } from "formik";
import Image from "next/legacy/image";
import { AiOutlineHeart, AiOutlineInfoCircle } from "react-icons/ai";

const Cart = () => {
  const CardAcceptedImages = ["/assets/images/verve-logo.png", "/assets/images/visa-logo.png", "/assets/images/mastercard-logo.png"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 p-3 md:gap-x-4 gap-y-4">
      <div className="col-span-3">
        <div className="flex mx-auto flex-col w-full rounded-sm gap-y-3 shadow p-8 border border-secondary-300">
          <div className="flex flex-row justify-between items-end">
            <h4 className="font-bold md:text-xl text-lg ">My Cart</h4>
            <p className="text-xs md:text-sm font-bold">All your items are here</p>
          </div>
          <div className="flex flex-col gap-y-3 h-[71vh] overflow-y-auto overflow-x-hidden">
            {Array(10)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex flex-row gap-x-4 py-3 border-t border-gray-300  relative">
                  <div className="absolute transform rotate-45 font-medium right-0 -top-1 text-4xl ">+</div>
                  <div className="block">
                    <div className="relative h-[150px] w-[120px] flex">
                      <Image src="/assets/images/house02.jpg" alt="items added to cart" layout="fill" objectFit="cover" />
                    </div>
                  </div>
                  <div className="flex flex-col  gap-y-3">
                    <div className="flex flex-row font-bold gap-x-1.5 items-end">
                      <h4>₦{NumberFormatter("7000")}</h4>
                      <p className="text-xs line-through mb-0.5">₦{NumberFormatter("7000")}</p>
                    </div>
                    <p className="line-clamp-2">Men's Leather Breathable Sports Casual Running Shoes -black</p>
                    <div className="flex gap-x-5 items-center w-44">
                      <p className="flex flex-row items-center gap-x-1 text-xl rounded-md border border-secondary-300 h-7 place-content-center w-8">+</p>
                      <p className="flex flex-row items-center gap-x-1 text-xl rounded-md border border-secondary-300 h-7 place-content-center w-8">-</p>
                      <div className="space-x-2">
                        <span className="font-bold">Total:</span>
                        <span>45</span>
                      </div>
                    </div>
                    <div className="w-44 flex flex-row items-center gap-x-1 text-sm rounded-md border border-secondary-300 place-content-center px-3 py-2">
                      <AiOutlineHeart className="text-lg" />
                      <span>Save for later</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex mx-auto flex-col rounded-sm gap-y-3 w-full shadow p-8 border border-secondary-300">
          <div className="flex flex-col text-sm space-y-3">
            <h4 className="font-bold text-base mt-1">TOTAL</h4>
            <hr />
            <div className="flex justify-between">
              <h3 className="font-bold">Sub-total</h3>
              <h3>₦{NumberFormatter("70000.00")}</h3>
            </div>
            <div className="flex justify-between">
              <h3 className="font-bold">Delivery</h3>
              <AiOutlineInfoCircle className="text-lg" />
            </div>

            <select className="bg-inherit py-2 border-b border-gray-600 font-semibold text-secondary-400">
              {["Standard Delivery (Free)", "Fast Delivery + $50"].map((option, index) => (
                <option key={index} className=" animate-select border-b-2 border-gray-700">
                  {option}
                </option>
              ))}
            </select>
            <button className="w-full rounded-sm bg-green-600 font-bold text-center md:text-base py-4 text-secondary-50">CHECKOUT</button>
            <div className="font-bold space-y-2">
              <p>WE ACCEPT:</p>
              <div className="flex flex-row space-x-3">
                {CardAcceptedImages?.map((data, index) => (
                  <div key={index} className="h-8 w-10 relative ">
                    <Image src={data} alt="banks logo" layout="fill" objectFit="cover" />
                  </div>
                ))}
              </div>
              <p>Got a discount code? Add it in the next step</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.getLayout = getLayout;
export default Cart;
