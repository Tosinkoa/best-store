import { useGetAuthQuery } from "@/store/APIs/authenticationApi";
import { useAddProductToCartMutation } from "@/store/APIs/cartApi";
import { useGetAllProductsQuery } from "@/store/APIs/productApi";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { BsFire } from "react-icons/bs";
import { toast } from "react-toastify";
import NumberFormatter from "../01Utils/NumberFormatter";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import CustomToast from "../01Utils/CustomToast";
import { useDispatch } from "react-redux";
import { addedCartToLocalStorageActions } from "@/store/slices/added-cart-to-localstorage";

const LandingPageHotDeals = () => {
  const dispatch = useDispatch();
  const {
    isSuccess: isUserAuthenticatedSuccessfully,
    isLoading: isUserAuthenticatedLoading,
    isError: isUserAuthenticatedError,
  } = useGetAuthQuery();
  const [hoveredCardID, setHoveredCardID] = useState("");
  const { isMediumAndSmallScreen, isLargeScreen } = useGetScreenWidth();

  const [addProductToCart, { isLoading: isAddProductToCartLoading }] =
    useAddProductToCartMutation();

  const { data: allProductData, isLoading: isAllProductDataLoading } = useGetAllProductsQuery({
    data_amount: 10,
  });

  const addProductToCartHandler = async (incomingProduct) => {
    // If user is yet to login, add cart products to localStorage
    if (!isUserAuthenticatedLoading && isUserAuthenticatedError) {
      console.log("Before this!");
      await dispatch(addedCartToLocalStorageActions.addedCartToLocalStorage(true));
      console.log("After this!");

      if (typeof window !== "undefined") {
        const previousLocalStorageProduct = localStorage.getItem("cart_products");
        if (previousLocalStorageProduct) {
          const parsedPreviousData = JSON.parse(previousLocalStorageProduct);
          // If the incoming data already exist, increase it's counts
          // else, just add the incoming data
          const dataAlreadyExistIndex = parsedPreviousData.findIndex(
            (eachData) => eachData.product_id === incomingProduct.id
          );
          if (dataAlreadyExistIndex !== -1) {
            parsedPreviousData[dataAlreadyExistIndex].product_count += 1;
          } else {
            parsedPreviousData.push({ product_count: 1, product_id: incomingProduct.id });
          }

          const stringifiedCartData = JSON.stringify(parsedPreviousData);
          localStorage.setItem("cart_products", stringifiedCartData);
        } else {
          let localStorageData = [{ product_count: 1, product_id: incomingProduct.id }];
          console.log(localStorageData);
          const stringifiedCartData = JSON.stringify(localStorageData);
          localStorage.setItem("cart_products", stringifiedCartData);
        }
        await dispatch(addedCartToLocalStorageActions.addedCartToLocalStorage(false));
        return toast.success("Product added to cart successfully!");
      }
      // Update the navbar count by setting some variable to true
    }

    // If user has logged in, add cart products to localStorage
    if (!isUserAuthenticatedLoading && isUserAuthenticatedSuccessfully) {
      const body = { product_count: 1 };
      const result = await addProductToCart({ body, product_id: incomingProduct.product_id });
      if (result.error) {
        const { error } = result.error.data;
        const errorResult = ErrorGetter(error);
        return toast.warning(errorResult);
      }
      if (result.data) return toast.success(result.data);
    }
  };

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
        <Link
          href="/product"
          passHref
          className="bg-gray-200 rounded-sm px-3 md:px-6 py-2 text-xs"
        >
          SEE ALL
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6">
        {allProductData?.data?.map((eachProductData) => {
          return (
            <div
              onMouseEnter={() => setHoveredCardID(eachProductData.id)}
              onMouseLeave={() => setHoveredCardID("")}
              key={eachProductData.id}
              className="w-full flex lg:h-[350px] h-[340px] rounded-md border shadow-md flex-col"
            >
              <Link
                href="/product/[product_id]"
                as={`/product/${eachProductData.id}`}
                passHref
                className="h-full w-full relative rounded-t-md "
              >
                <Image
                  src={eachProductData.images[0].image_url}
                  alt={eachProductData.name}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-t-md "
                />
              </Link>
              <div className="justify-between flex flex-col mt-1 py-2 rounded-b-md px-1.5 md:px-2 relative bg-white h-[155px]">
                {/* Shop Location */}
                {/* Shop Name */}
                <p className="font-semibold text-sm line-clamp-2 h-fit">
                  {eachProductData.name}
                </p>
                <div className=" mt-1 font-semibold gap-x-2 items-center flex flex-row text-sm">
                  <div className="flex flex-col ">
                    <p>₦{NumberFormatter(eachProductData.price)}</p>
                    {eachProductData.crossed_out_price && (
                      <p className="text-xs  line-through font-normal">
                        ₦{NumberFormatter(eachProductData.crossed_out_price)}
                      </p>
                    )}
                  </div>
                </div>
                {/* {(isMediumAndSmallScreen ||
                  (eachProductData.id === hoveredCardID && isLargeScreen)) && ( */}
                <button
                  disabled={isAddProductToCartLoading}
                  onClick={() => addProductToCartHandler(eachProductData)}
                  className="w-full text-center bg-primary-500 rounded-md shadow font-semibold py-2.5 text-secondary-50"
                >
                  Add to cart
                </button>
                {/* )} */}
              </div>
            </div>
          );
        })}
      </div>
      <CustomToast position="bottom-center" />
    </div>
  );
};

export default LandingPageHotDeals;
