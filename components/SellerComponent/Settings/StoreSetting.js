import MyInput, { MySelect, MyTextArea } from "@/components/01-Utils/Formik";
import { Form, Formik } from "formik";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

/**
 * @todo Message for accepting bargain -> Are you sure you want to accept offer
 *       Note, other offer will be gone once you accept this.
 * @todo Show store feature.
 * @todo Put logout, settings and profile button on user profile picture
 */

const StoreSetting = () => {
  const router = useRouter();
  const [storeLogoImage, setStoreLogoImage] = useState({});
  const [storeLogoImageURL, setStoreLogoImageURL] = useState("");

  useEffect(() => {
    if (storeLogoImage?.name) setStoreLogoImageURL(URL.createObjectURL(storeLogoImage));
  }, [storeLogoImage]);

  const States = [
    { id: 1, name: "Osun" },
    { id: 2, name: "Lagos" },
  ];

  const Cities = [
    { id: 1, name: "Ilesa" },
    { id: 2, name: "Ikeja" },
  ];

  return (
    <div className="flex flex-col w-full ga-y-6">
      <div className="relative h-40 w-40 rounded-xl my-5 mx-auto flex">
        {/* Image Tag */}
        {storeLogoImageURL && (
          <Image
            src={storeLogoImageURL}
            alt="store-logo"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        )}
        {/* Input tag */}
        <div className="w-full h-full rounded-xl bg-black opacity-50"></div>
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
                  setStoreLogoImage(e.target.files[0]);
                }}
              />
              <AiOutlineCamera />
            </div>
            <div
              onClick={() => {
                setStoreLogoImageURL("");
                setStoreLogoImage({});
              }}
              className="relative cursor-pointer  flex transform -top-2 rotate-45 text-5xl h-fit w-fit rounded-full"
            >
              +
            </div>
          </div>
        </div>
      </div>
      {/* Phone number, their website, thier email, thier location,store logo, store name, about store (description) */}

      <Formik
        initialValues={{
          store_name: "",
          about: "",
          states: "",
          city: "",
        }}
      >
        {() => (
          <Form className="grid md:grid-cols-2 gap-3 md:w-8/12 w-11/12 mx-auto">
            <div className="md:col-span-2">
              <MyInput
                name="store_name"
                label="Store Name"
                className="w-full border border-secondary-400 rounded-md h-10 p-3"
              />
            </div>
            <div className="">
              <MyInput
                name="phone_number"
                label="Phone Number"
                className="w-full border border-secondary-400 rounded-md h-10 p-3"
              />
            </div>
            <div className="flex flex-col">
              <MySelect
                name="states"
                label="States"
                options={States}
                className="resize-none w-full border border-secondary-400 rounded-md h-10 p-3"
              />
            </div>
            <div className="flex flex-col">
              <MySelect
                name="city"
                label="City"
                options={Cities}
                className="resize-none w-full border border-secondary-400 rounded-md h-10 p-3"
              />
            </div>
            <div className="md:col-span-2">
              <MyTextArea
                name="about"
                label="About (Explain what you offer)"
                className="resize-none w-full border border-secondary-400 rounded-md h-10 p-3"
              />
            </div>

            <div className="md:col-span-2 w-full justify-between flex">
              <button
                onClick={() => router.back()}
                className="bg-red-500 h-10 px-3 py-2 text-secondary-50  font-semibold rounded-md shadow"
              >
                Cancel
              </button>
              <div className="bg-purple-600 px-3 py-2 w-[58px] items-center text-secondary-50 h-10 font-semibold rounded-md shadow">
                {/* <div className="border-2 rounded-full h-6 flex mx-auto w-6 border-b-0 animate-spin  "></div> */}
                Save
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreSetting;
