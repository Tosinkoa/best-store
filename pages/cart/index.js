import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import { ErrorGetter } from "@/components/01Utils/ErrorGetter";
import NumberFormatter from "@/components/01Utils/NumberFormatter";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import {
  useAddProductToCartMutation,
  useGetBuyerCartQuery,
  useRemoveProductFromCartMutation,
} from "@/store/APIs/cartApi";
import { useAddProductToSavedItemMutation } from "@/store/APIs/savedItemApi";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineInfoCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { toast } from "react-toastify";

const Cart = () => {
  const [addProductToCart] = useAddProductToCartMutation();
  const [removeProductFromCart] = useRemoveProductFromCartMutation();
  const [addProductToSavedItem] = useAddProductToSavedItemMutation();
  const [totalCartProductPrice, setTotalCartProductPrice] = useState(0);
  const {
    currentData: allCartData,
    isLoading: isAllCartDataLoading,
    isError: isAllCartError,
  } = useGetBuyerCartQuery();
  const CardAcceptedImages = [
    "/assets/images/verve-logo.png",
    "/assets/images/visa-logo.png",
    "/assets/images/mastercard-logo.png",
  ];

  const addProductToCartHandler = async (product_id) => {
    const body = { product_count: 1 };
    const result = await addProductToCart({ body, product_id });
    if (result.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      toast.warning(errorResult);
    }
    if (result.data) return toast.success(result.data);
  };

  const removeProductFromCartHandler = async (cart_id, deleteCart) => {
    // --- When a falsy value is send to the server, the cart will be deleted
    const body = { product_count: deleteCart ? 0 : 1 };
    const result = await removeProductFromCart({ body, cart_id });
    if (result.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      toast.warning(errorResult);
    }
    if (result.data && deleteCart) return toast.success(result.data);
  };

  useEffect(() => {
    if (allCartData?.data?.length > 0) {
      const allPrice = allCartData?.data?.map(
        (eachCartData) => eachCartData.price * eachCartData.product_count
      );
      const totalPrice = allPrice.reduce((acc, num) => acc + num, 0);
      setTotalCartProductPrice(totalPrice);
    }
    if (allCartData?.data?.length < 1 || !allCartData?.data || isAllCartError) {
      setTotalCartProductPrice(0);
    }
  }, [allCartData, isAllCartError]);

  const addProductToSavedItemHandler = async (product_id) => {
    const result = await addProductToSavedItem(product_id);
    if (result.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      toast.warning(errorResult);
    }
    if (result.data) return toast.success(result.data);
  };

  return (
    <div className="h-[calc(100dvh_-_55px)] top-[55px] md:items-center md:flex">
      <div className="grid grid-cols-1 md:grid-cols-5 w-full inset-0 p-3 lg:px-10 md:gap-x-4 gap-y-4  lg:gap-x-8">
        <div className="col-span-3">
          <div className="flex  flex-col w-full rounded-md gap-y-3 shadow-md lg:p-8 p-5 border-secondary-300 bg-white">
            <div className="flex flex-row justify-between items-end">
              <h4 className="font-bold text-lg ">My Cart</h4>
              <p className="text-xs md:text-sm font-bold">All your items are here</p>
            </div>
            <div className="no-scrollbar flex flex-col gap-y-3 h-[68vh] inset-y-0 my-auto overflow-y-auto overflow-x-hidden">
              {allCartData?.data?.length > 0 &&
                !isAllCartError &&
                allCartData?.data?.map((eachCartData) => (
                  <div
                    key={eachCartData.id}
                    className="flex flex-row gap-x-4 py-3 border-t border-gray-300  relative"
                  >
                    <div
                      onClick={() => removeProductFromCartHandler(eachCartData.id, true)}
                      className="cursor-pointer absolute transform rotate-45 font-medium right-0 -top-1 text-4xl "
                    >
                      +
                    </div>
                    <div className="block">
                      <div className="relative h-[150px] w-[120px] flex">
                        <Image
                          src={eachCartData.images[0].image_url}
                          alt={eachCartData.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col  gap-y-3">
                      <div className="flex flex-row font-bold gap-x-1.5 items-end">
                        <h4>₦{NumberFormatter(eachCartData.price)}</h4>
                        {eachCartData.crossed_out_price && (
                          <p className="text-xs line-through mb-0.5">
                            ₦{NumberFormatter(eachCartData.crossed_out_price)}
                          </p>
                        )}
                      </div>
                      <p className="line-clamp-2">{eachCartData.name}</p>
                      <div className="flex gap-x-5 items-center w-44">
                        <button
                          onClick={() => removeProductFromCartHandler(eachCartData.id)}
                          className="flex flex-row items-center gap-x-1 text-xl rounded-md border border-secondary-300 h-7 place-content-center w-8"
                        >
                          -
                        </button>
                        <button
                          disabled={isAllCartDataLoading}
                          onClick={() => addProductToCartHandler(eachCartData.product_id)}
                          className="flex flex-row items-center gap-x-1 text-xl rounded-md border border-secondary-300 h-7 place-content-center w-8"
                        >
                          +
                        </button>
                        <div className="space-x-2">
                          <span className="font-semibold">Total:</span>
                          <span>{eachCartData.product_count}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addProductToSavedItemHandler(eachCartData.product_id)}
                        className="w-44 flex flex-row items-center gap-x-1 text-sm rounded-md border border-secondary-300 place-content-center px-3 py-2"
                      >
                        <AiOutlineHeart className="text-lg" />
                        <span>Save for later</span>
                      </button>
                    </div>
                  </div>
                ))}
              {(allCartData?.data?.length < 1 || !allCartData?.data || isAllCartError) && (
                <div className="inset-0 m-auto text-primary-600 space-y-2">
                  <BsCart4 className="mx-auto  text-5xl animate-breathing-object" />
                  <p className=" font-semibold text-xl text-secondary-500 ">
                    Nothing in cart!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex mx-auto flex-col rounded-md bg-white gap-y-3 w-full shadow-md lg:p-8 p-5 border-secondary-300">
            <div className="flex flex-col text-sm space-y-3">
              <h4 className="font-bold text-sm mt-1">TOTAL</h4>
              <hr />
              <div className="flex justify-between">
                <h3 className="font-bold">Sub-total</h3>
                <h3>₦{NumberFormatter(totalCartProductPrice)}</h3>
              </div>
              <div className="flex justify-between">
                <h3 className="font-bold">Delivery</h3>
                <AiOutlineInfoCircle className="text-lg" />
              </div>

              <select className="bg-inherit py-2 border-b rounded-sm border-gray-600 font-semibold text-secondary-400">
                {["Standard Delivery (Free)", "Fast Delivery + $50"].map((option, index) => (
                  <option key={index} className=" animate-select border-b-2 border-gray-700">
                    {option}
                  </option>
                ))}
              </select>
              <button className="w-full rounded-sm lg:text-base text-xs bg-green-600 font-semibold text-center py-3 text-secondary-50">
                CHECKOUT
              </button>
              <div className="font-bold space-y-2">
                <p>WE ACCEPT:</p>
                <div className="flex flex-row space-x-3">
                  {CardAcceptedImages?.map((data, index) => (
                    <div key={index} className="h-8 w-10 relative ">
                      <Image src={data} alt="banks logo" layout="fill" objectFit="cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizeHOC(Cart, getLayout);
