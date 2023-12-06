import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import LoadingUICart from "@/components/01Utils/LoadingUICart";
import ProductList from "@/components/GeneralComponent/ProductList";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { useGetSavedItemQuery } from "@/store/APIs/savedItemApi";
import { AiOutlineHeart } from "react-icons/ai";

const SaveItem = () => {
  const { data: savedItemData, isLoading: isSavedItemDataLoading } = useGetSavedItemQuery();

  console.log(
    "!isSavedItemDataLoading && savedItemData?.data > 0:",
    !isSavedItemDataLoading && savedItemData?.data?.length > 0
  );
  console.log(savedItemData?.data);
  return (
    <div className="p-4 md:p-8">
      {isSavedItemDataLoading && <LoadingUICart />}
      {!isSavedItemDataLoading && savedItemData?.data?.length > 0 && (
        <ProductList productData={savedItemData} />
      )}
      {!isSavedItemDataLoading &&
        (savedItemData?.data?.length < 1 || !savedItemData?.data) && (
          <div className="h-[calc(100vh_-_55px)] w-full flex">
            <div className="h-fit  my-auto flex w-fit inset-0 mx-auto flex-col space-y-2">
              <AiOutlineHeart className="text-6xl animate-breathing-object flex mx-auto text-primary-800" />
              <p className="font-semibold text-lg">No Saved Product!</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default AuthorizeHOC(SaveItem, getLayout);
