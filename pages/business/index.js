import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import PaginationButtons from "@/components/01Utils/PaginationButtons";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import usePaginationFunction from "@/components/ReusableHooks/usePaginationFunction";
import { useGetAllSellerQuery } from "@/store/APIs/bussinessApi";
import Image from "next/legacy/image";
import Link from "next/link";

const Stores = () => {
  const sellerAmount = 20;
  const {
    data_offset,
    dataToFetchPerRequest,
    dataOffsetDecrementHandler,
    dataOffsetIncrementHandler,
  } = usePaginationFunction();

  const { data: allSellerData, isLoading: allSellerDataIsLoading } = useGetAllSellerQuery(
    {
      data_amount: dataToFetchPerRequest,
      data_offset,
    },
    { refetchOnMountOrArgChange: data_offset }
  );

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-2 grid-cols-2">
        {!allSellerDataIsLoading &&
          allSellerData?.data?.map((eachSellerData) => (
            <Link
              key={eachSellerData.id}
              passHref
              href={`/business/${eachSellerData.id}`}
              className="w-full flex h-64 border text-center gap-y-2 rounded-md bg-white flex-col p-3"
            >
              {/* <BsShop className="text-9xl flex mx-auto" /> */}
              <div className="h-[150px] w-[150px] relative flex mx-auto">
                <Image
                  src={eachSellerData.business_logo || "/assets/images/shop_icon01.png"}
                  alt="shop icon"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-2 bg-primary-300 rounded-md shadow">
                <p className=" font-bold text-base md:text-lg items-center line-clamp-2 h-fit  ">
                  {eachSellerData.business_name}
                </p>
              </div>
              {/* <p className="text-sm">Clothes, Smart Phones, Wrist Watch, Perfume</p> */}
            </Link>
          ))}
      </div>
      {allSellerData?.data?.length > 0 && (
        <PaginationButtons
          paginationButtonID="sellers"
          dataOffsetDecrementHandler={dataOffsetDecrementHandler}
          dataOffsetIncrementHandler={dataOffsetIncrementHandler}
        />
      )}
    </>
  );
};

export default AuthorizeHOC(Stores, getLayout);
