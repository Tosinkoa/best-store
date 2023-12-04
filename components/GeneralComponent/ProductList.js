import NumberFormatter from "@/components/01Utils/NumberFormatter";
import { useAddProductToCartMutation } from "@/store/APIs/cartApi";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsShop } from "react-icons/bs";
import { toast } from "react-toastify";
import CustomToast from "../01Utils/CustomToast";
import useGetScreenWidth from "../ReusableHooks/useGetScreenWidth";
import { ShopData } from "../Shop/ShopData";

const ProductList = ({ productData, isLoggedInSellerProduct = true }) => {
  const router = useRouter();
  const [overallProductFiveStar, setOverallProductFiveStar] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hoveredCardID, setHoveredCardID] = useState("");
  const { isMediumAndSmallScreen, isLargeScreen } = useGetScreenWidth();
  const [addProductToCart, { isLoading: isAddProductToCartLoading }] =
    useAddProductToCartMutation();

  useEffect(() => {
    for (const item of ShopData) {
      const totalStars =
        item.one_star * 1 +
        item.two_star * 2 +
        item.three_star * 3 +
        item.four_star * 4 +
        item.five_star * 5;

      const totalResponses =
        item.one_star + item.two_star + item.three_star + item.four_star + item.five_star;

      const fiveStarScore = (totalStars / totalResponses).toFixed(1);
      setOverallProductFiveStar(fiveStarScore);
      setTotalRatings(totalResponses);
    }
  }, []);

  const addProductToCartHandler = async (product_id) => {
    const body = { product_count: 1 };
    const result = await addProductToCart({ body, product_id });
    if (result.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      return toast.warning(errorResult);
    }
    if (result.data) return toast.success(result.data);
  };

  console.log("productData:", productData);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-2 grid-cols-2 ">
        {productData?.data?.map((eachProductData) => {
          return (
            <div
              onMouseEnter={() => setHoveredCardID(eachProductData.id)}
              onMouseLeave={() => setHoveredCardID("")}
              key={eachProductData.id}
              className="w-full flex lg:h-[350px] h-[370px] rounded-md border shadow-md flex-col"
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
              <div className="flex flex-col mt-1 py-1 rounded-b-md px-1.5 md:px-2 relative bg-white h-[155px]">
                {/* Shop Location */}
                {!isLoggedInSellerProduct && (
                  <div className="flex flex-row text-xl text-secondary-600 items-center space-x-1">
                    {eachProductData.business_logo ? (
                      <Image
                        src={eachProductData.business_logo}
                        height={30}
                        width={30}
                        objectFit="cover"
                        className="rounded-sm"
                      />
                    ) : (
                      <BsShop className="text-sm font-bold" />
                    )}
                    <div className="text-xs line-clamp-1">{eachProductData.business_name}</div>
                  </div>
                )}
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
                  {eachProductData.crossed_out_price && (
                    <p className="text-xs  bg-primary-300 rounded-sm shadow-sm p-1 text-secondary-50">
                      {(
                        ((eachProductData.crossed_out_price - eachProductData.price) /
                          eachProductData.crossed_out_price) *
                        100
                      ).toFixed()}
                      %
                    </p>
                  )}
                </div>
                <div className="flex flex-row gap-x-2 -mt-1 items-center font-semibold">
                  <i data-star={overallProductFiveStar} className="text-lg"></i>
                  <p className="text-xs">({totalRatings})</p>
                </div>
                {((isMediumAndSmallScreen && !isLoggedInSellerProduct) ||
                  (eachProductData.id === hoveredCardID &&
                    isLargeScreen &&
                    !isLoggedInSellerProduct)) && (
                  <button
                    disabled={isAddProductToCartLoading}
                    onClick={() => addProductToCartHandler(eachProductData.id)}
                    className="w-full text-center bg-primary-500 rounded-md shadow font-semibold py-1.5 text-secondary-50"
                  >
                    Add to cart
                  </button>
                )}
                {((isMediumAndSmallScreen && isLoggedInSellerProduct) ||
                  (eachProductData.id === hoveredCardID &&
                    isLargeScreen &&
                    isLoggedInSellerProduct)) && (
                  <button
                    onClick={() =>
                      router.push(`/my-business/edit-product/${eachProductData.id}`)
                    }
                    className="w-full text-center bg-primary-500 rounded-md shadow font-semibold py-1.5 text-secondary-50"
                  >
                    Edit Product
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <CustomToast />
    </>
  );
};

export default ProductList;
