import { useGetLoggedInSellerQuery } from "@/store/APIs/bussinessApi";
import { useGetASellerProductsQuery } from "@/store/APIs/productApi";
import dayjs from "dayjs";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import LoadingUICart from "../01Utils/LoadingUICart";
import ProductList from "./ProductList";

const OneStore = ({ isLoggedInSellerProduct }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: sellerAccountSetupData, isLoading: isSellerAccountSetupDataLoading } =
    useGetLoggedInSellerQuery();
  const router = useRouter();
  const { data: sellerProductsData, isLoading: isSellerProductsLoading } =
    useGetASellerProductsQuery({ data_amount: 50, data_offset: 0 });
  const { store_id } = router.query;

  /**
   * @TODO Add Date joined to the seller details social info
   */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    const targetElement = document.querySelector("#store-details");
    if (targetElement) observer.observe(targetElement);
    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, []);

  return (
    <>
      {isSellerAccountSetupDataLoading ? (
        <LoadingUICart />
      ) : (
        <div className="flex flex-col relative scroll-mt-20" id="store-page-top">
          <div>
            <div className="grid md:grid-cols-2 gap-3 w-full px-4 items-center  my-4 md:h-[180px] h-[90%] ">
              <div className="flex flex-col relative h-48">
                <div className="h-[150px] w-[150px] rounded-md relative flex flex-col mx-auto">
                  <Image
                    className="rounded-md"
                    src={
                      sellerAccountSetupData
                        ? sellerAccountSetupData?.data?.business_logo
                        : "/assets/images/shop_icon01.png"
                    }
                    alt="shop icon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-2 truncate w-[80%] mx-auto text-center">
                  <p className="  font-bold text-base md:text-lg">
                    {sellerAccountSetupData?.data?.business_name}
                  </p>
                </div>
              </div>
              <div className=" flex flex-col h-48 self-end font-semibold text-secondary-500">
                <div className="flex flex-row items-center">
                  <div className="flex flex-row items-center space-x-6">
                    <div className="p-3 font-bold flex space-x-1 items-center text-primary-700">
                      <BsTelephone className="text-lg" />
                      <span> {sellerAccountSetupData?.data?.phone_number} </span>
                    </div>
                    <div className="p-3 font-bold flex space-x-1 items-center text-primary-700">
                      <AiOutlineUser className="text-2xl" />
                      <span>
                        {dayjs(sellerAccountSetupData?.data?.created_at).format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="flex w-full overflow-y-auto h-[76%] p-3">
                  {sellerAccountSetupData?.data?.about}
                </p>
              </div>
            </div>
            {/* {!isVisible && (
              <Link
                href={
                  router.pathname.includes("my-business")
                    ? "/my-business#store-page-top"
                    : `/business/${store_id}#store-page-top`
                }
                passHref
                className="fixed bg-white z-50 top-[55px] left-0 lg:left-[250px] py-2 px-3 rounded-sm rounded-t-none shadow-md border-t flex flex-row items-center w-fit md:max-w-[50%] sm:max-w-[70%] "
              >
                <div className="h-10 w-10 relative flex mx-auto">
                  <Image
                    src={
                      sellerAccountSetupData
                        ? sellerAccountSetupData?.data?.business_logo
                        : "/assets/images/shop_icon01.png"
                    }
                    alt="shop icon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="font-bold line-clamp-1">Guandow Store</p>
              </Link>
            )} */}
          </div>
          <div className="lg:px-10 md:px-3 gap-y-3 px-4 mb-6">
            {isLoggedInSellerProduct && (
              <Link
                passHref
                href="/my-business/new-product"
                className="px-5 py-1.5 font-semibold rounded-md ml-auto flex my-2 text-secondary-50 w-fit shadow-sm bg-gradient-to-tr from-primary-800 to-primary-500 items-center space-x-2"
              >
                <AiOutlinePlus className="text-white text-2xl" />
                <span>Add Product</span>
              </Link>
            )}
            <div
              className={`${!isLoggedInSellerProduct && "my-3"} flex border border-primary-50`}
              id="store-details"
            ></div>
            {isSellerProductsLoading ? (
              <LoadingUICart />
            ) : (
              <ProductList productData={sellerProductsData} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OneStore;
