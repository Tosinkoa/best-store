import CustomToast from "@/components/01Utils/CustomToast";
import MyInput, { MySelect, MyTextArea } from "@/components/01Utils/Formik";
import useGetStatesInNigeria from "@/components/ReusableHooks/useGetStatesInNigeria";
import {
  useGetLoggedInSellerQuery,
  useSetupSellerAccountMutation,
} from "@/store/APIs/bussinessApi";
import { Form, Formik } from "formik";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingUICart from "@/components/01Utils/LoadingUICart";

/**
 * @todo Message for accepting bargain -> Are you sure you want to accept offer
 *       Note, other offer will be gone once you accept this.
 * @todo Show store feature.
 * @todo Put logout, settings and profile button on user profile picture
 */

const BusinessSetting = () => {
  const router = useRouter();
  const [businessLogoImage, setBusinessLogoImage] = useState(null);
  const [businessLogoImageURL, setBusinessLogoImageURL] = useState("");
  const { stateOption, isNigeriaStateDataLoading, isStateSorting } = useGetStatesInNigeria();
  const [setupSellerAccount, { isLoading: accountSetupIsLoading }] =
    useSetupSellerAccountMutation();
  const { data: sellerAccountSetupData, isLoading: isSellerAccountSetupDataLoading } =
    useGetLoggedInSellerQuery();

  useEffect(() => {
    if (businessLogoImage?.name)
      setBusinessLogoImageURL(URL.createObjectURL(businessLogoImage));
  }, [businessLogoImage]);

  const Cities = [
    { id: 0, name: "--Select City", value: "" },
    { id: 1, name: "Ilesa", value: "Ilesa" },
    { id: 2, name: "Ikeja", value: "Ikeja" },
  ];

  const submitBusinessForm = async (values) => {
    const { business_name, about, state, city } = values;

    if (!businessLogoImage?.name && !sellerAccountSetupData?.data?.business_logo) {
      return toast.warning("Business logo is required!");
    }
    if (!sellerAccountSetupData?.data?.business_name && !business_name) {
      return toast.warning("Business name is required!");
    }
    if (!sellerAccountSetupData?.data?.about && !about) {
      return toast.warning("About field is required!");
    }
    if (!sellerAccountSetupData?.data?.state && !state) {
      return toast.warning("State field is required!");
    }
    if (!sellerAccountSetupData?.data?.city && !city) {
      return toast.warning("State field is required!");
    }
    const formData = new FormData();
    if (business_name) formData.append("business_name", business_name);
    if (about) formData.append("about", about);
    if (state) formData.append("state", state);
    if (city) formData.append("city", city);
    if (businessLogoImage) formData.append("business_logo", businessLogoImage);

    const body = formData;
    const result = await setupSellerAccount(body);
    if (result?.error) {
      return toast.warning("Something went wrong, try again!");
    } else toast.success("Update was successful!");
  };

  /**
   * @todo Add MySelect style globally
   * @todo Add loading skeleton to pages
   */

  return (
    <>
      {isSellerAccountSetupDataLoading ? (
        <LoadingUICart />
      ) : (
        <div className="flex flex-col w-full gap-y-6">
          <div>
            <label className="label_style">Add Business Logo</label>
            <div className="relative h-40 w-40 rounded-xl flex">
              {/* Image Tag */}
              {(businessLogoImageURL || sellerAccountSetupData?.data?.business_logo) && (
                <Image
                  src={
                    businessLogoImageURL
                      ? businessLogoImageURL
                      : sellerAccountSetupData?.data?.business_logo
                  }
                  alt="store-logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              )}
              {/* Input tag */}
              <div className="w-full h-full rounded-full bg-black opacity-50"></div>
              <div className="absolute inset-0 flex text-secondary-50 m-auto space-x-5 ">
                {/* Background Color Tag */}
                <div className="flex absolute inset-0 m-auto gap-x-8 flex-row justify-between px-5 h-fit w-fit">
                  {/* camera and cancel button */}
                  <div className="relative h-10  w-10 text-4xl place-content-center rounded-xl ">
                    <input
                      type="file"
                      className="h-10 w-10 absolute rounded-full opacity-0"
                      title=""
                      onChange={(e) => {
                        setBusinessLogoImage(e.target.files[0]);
                      }}
                    />
                    <AiOutlineCamera />
                  </div>
                  <div
                    onClick={() => {
                      setBusinessLogoImageURL("");
                      setBusinessLogoImage({});
                    }}
                    className="relative cursor-pointer  flex transform -top-2 rotate-45 text-5xl h-fit w-fit rounded-full"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Formik
            onSubmit={submitBusinessForm}
            initialValues={{
              business_name: sellerAccountSetupData?.data?.business_name || "",
              about: sellerAccountSetupData?.data?.about || "",
              state: sellerAccountSetupData?.data?.state || "",
              city: sellerAccountSetupData?.data?.city || "",
            }}
          >
            {() => (
              <Form className="grid md:grid-cols-2 gap-x-3 gap-y-0 w-full mx-auto">
                <div className="flex flex-col">
                  <MyInput
                    name="business_name"
                    label="Business Name"
                    className="input_style"
                  />
                </div>

                {/* ======================State Option========================= */}

                <div className="flex flex-col w-full mb-3">
                  <label className="label_style" htmlFor="state">
                    State
                  </label>
                  {!isStateSorting &&
                    !isNigeriaStateDataLoading &&
                    stateOption?.length > 0 && (
                      <MySelect
                        options={stateOption}
                        selectClassName="input_style !bg-primary-50"
                        name="state"
                      />
                    )}

                  {(isStateSorting || isNigeriaStateDataLoading) && (
                    <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 py-2">
                      <p className="flex truncate cursor-pointer text-sm font-semibold text-secondary-500">
                        Fetching States In Nigeria...
                      </p>
                    </div>
                  )}
                  {!isStateSorting &&
                    !isNigeriaStateDataLoading &&
                    stateOption?.length < 1 && (
                      <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 pr-1 py-2">
                        <p className="flex truncate cursor-pointer text-sm font-semibold text-secondary-500">
                          Error, refresh the page and try again!
                        </p>
                      </div>
                    )}
                </div>
                {/* ============================================================ */}

                <div className="flex flex-col">
                  <MySelect
                    name="city"
                    label="City"
                    options={Cities}
                    selectClassName="resize-none input_style !bg-primary-50"
                  />
                </div>
                <div className="md:col-span-2 ">
                  <MyTextArea
                    name="about"
                    label="About (Explain what you offer)"
                    className="resize-none input_style"
                  />
                </div>

                <div className="md:col-span-2 w-full justify-between my-4 flex">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="border-purple-400 border-2 h-10 px-3 py-2 text-primary-400  font-semibold rounded-md shadow"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={accountSetupIsLoading}
                    className="text-center bg-purple-600 px-3 py-2 place-content-center w-[58px] items-center text-secondary-50 h-10 font-semibold rounded-md shadow"
                  >
                    {accountSetupIsLoading ? (
                      <div className="border-2 rounded-full h-6 flex mx-auto w-6 border-b-0 animate-spin  "></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <CustomToast />
        </div>
      )}
    </>
  );
};

export default BusinessSetting;
