import NumberFormatter from "@/components/01Utils/NumberFormatter";
import { useAddProductToCartMutation } from "@/store/APIs/cartApi";
import { useGetAllSuggestedProductsQuery } from "@/store/APIs/productApi";
import DOMPurify from "dompurify";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { ErrorGetter } from "../../01Utils/ErrorGetter";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { toast } from "react-toastify";
import CustomToast from "../../01Utils/CustomToast";
import LoadingUICart from "../01Utils/LoadingUICart";

const ViewOneProductComponent = ({ productValues, isProductModiification }) => {
  const router = useRouter();
  const { product_id } = router.query;
  const [productAmountToAdd, setProductAmountToAdd] = useState(1);
  const [addProductToCart] = useAddProductToCartMutation();
  let transformedImages = [];

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(productValues.descriptionValue),
  });

  const itemAmountChangeHandler = (e) => {
    if (e.target.value > 99) return;
    setProductAmountToAdd(e.target.value);
  };

  // Check if productImages array has data
  if (productValues?.productImages?.length > 0) {
    // Transform the productImages array to the desired format
    transformedImages = productValues.productImages.map((image) => ({
      original: image.imageURL,
      thumbnail: image.imageURL,
    }));
  }

  const addProductToCartHandler = async () => {
    const body = { product_count: productAmountToAdd };
    const result = await addProductToCart({ body, product_id });
    if (result.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      toast.warning(errorResult);
    }

    if (result.data) return toast.success(result.data);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="grid md:grid-cols-2 md:gap-x-7 gap-y-4 w-full h-full">
        <div className="flex  md:gap-x-4 gap-x-2 w-full ">
          {productValues?.productImages?.length < 1 && (
            <div className="relative p-3 border bg-primary-100 border-secondary-300 flex-col flex place-content-center items-center text-center md:h-[60vh] h-[50vh] w-full font-bold text-primary-700 rounded-md">
              <MdOutlineImageNotSupported className="text-5xl" />
              <span>You're yet to add product images!</span>
            </div>
          )}
          {productValues?.productImages?.length > 0 && (
            <div className="image_preview_gallery relative h-fit w-full rounded-md">
              <ImageGallery
                showPlayButton={false}
                items={transformedImages}
                thumbnailPosition="left"
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-y-3  ">
          <div className="relative flex flex-row gap-x-2 ">
            <p className="font-semibold text-lg lg:text-2xl">
              {productValues?.name || (
                <span className="font-bold text-secondary-500">** No Title **</span>
              )}
            </p>
            <div className="flex flex-col items-center font-semibold w-fit ml-auto">
              <div className="text-xl space-x-2 flex flex-row items-center">
                {productValues.crossed_out_price && (
                  <span className="text-base line-through">
                    ₦{NumberFormatter(productValues.crossed_out_price)}
                  </span>
                )}
                <span>
                  {productValues.price ? (
                    `₦${NumberFormatter(productValues.price)}`
                  ) : (
                    <span className="font-bold text-secondary-500">** No Price **</span>
                  )}
                </span>
              </div>
              <>
                {!isProductModiification && (
                  <div className="flex flex-row items-center">
                    <i data-star="4.6" className="absolute text-lg"></i>
                    <p className="font-extrabold text-base">(76)</p>
                  </div>
                )}
              </>
            </div>
          </div>
          <hr />
          <div className="h-fit pb-8 lg:pb-0 lg:h-[50vh] md:overflow-y-auto">
            {productValues?.descriptionValue && (
              <div dangerouslySetInnerHTML={sanitizedData()} />
            )}
            {!productValues?.descriptionValue && (
              <span className="font-bold text-secondary-500">** No Description **</span>
            )}
          </div>
          {productValues.in_stock && (
            <div className="border border-secondary-400 rounded-sm py-1 px-2 font-semibold w-fit">
              {NumberFormatter(productValues.in_stock)} in stock
            </div>
          )}
          {!isProductModiification && (
            <>
              <hr />
              <div className="flex flex-row gap-x-4 items-center">
                <form>
                  <input
                    value={productAmountToAdd}
                    onChange={itemAmountChangeHandler}
                    type="number"
                    max={99}
                    min={1}
                    className="border-b font-bold px-2 text-sm border-0 focus:ring-0 focus:outline-none border-secondary-400 h-6 w-8 bg-inherit"
                  />
                </form>
                <AiOutlineMinus
                  onClick={() => {
                    if (productAmountToAdd === 1) return;
                    setProductAmountToAdd((prev) => prev - 1);
                  }}
                  className="cursor-pointer border border-secondary-400 rounded-sm py-1 px-2 text-2xl font-semibold w-fit"
                />
                <AiOutlinePlus
                  onClick={() => setProductAmountToAdd((prev) => prev + 1)}
                  className="cursor-pointer border border-secondary-400 rounded-sm py1 px-2 text-2xl font-semibold w-fit"
                />
                <button
                  onClick={addProductToCartHandler}
                  className="py-2 text-secondary-50 font-semibold px-3 bg-primary-800 text-xs rounded-[0.180rem]"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="w-full justify-between flex items-start text-secondary-500">
                <div className="flex text-xs font-semibold items-center gap-x-1 rounded-button border p-2 border-gray-300 cursor-pointer hover:shadow px-4">
                  <AiOutlineHeart className="text-lg" /> Add to wishlist
                </div>
                <div className="flex flex-col items-center gap-y-2">
                  <p className="text-xs font-semibold">SHARE THIS PRODUCT</p>
                  <div className="flex-row flex w-fit gap-x-4 text-xl">
                    <FaFacebookF />
                    <BsTwitter />
                  </div>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
      </div>
      {!isProductModiification && (
        <SuggestedProduct subCartegoryID={productValues.sub_category_id} />
      )}
      <CustomToast />
    </div>
  );
};

const SuggestedProduct = ({ subCartegoryID }) => {
  const { data: suggestedProductData, isLoading: isSuggestedProductDataLoading } =
    useGetAllSuggestedProductsQuery({
      data_amount: 10,
      sub_category_id: subCartegoryID,
    });

  return (
    <>
      {isSuggestedProductDataLoading && <LoadingUICart />}
      {!isSuggestedProductDataLoading && suggestedProductData?.data?.length > 0 && (
        <div className="flex flex-col mb-5">
          <p className=" text-lg font-semibold">Customers who viewed this also viewed</p>
          <div className="flex-row flex gap-x-3 overflow-x-auto">
            {suggestedProductData?.data?.map((eachProductData, index) => (
              <div className="flex flex-col gap-y-2">
                <div key={index} className="block">
                  <div className="relative h-32 w-32 rounded-md">
                    <Image
                      src={eachProductData.images[0].image_url}
                      alt="product image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <p className="line-clamp-2 text-xs">{eachProductData.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isSuggestedProductDataLoading &&
        (suggestedProductData?.data?.length < 1 || !suggestedProductData?.data) &&
        ""}
    </>
  );
};

export default ViewOneProductComponent;
