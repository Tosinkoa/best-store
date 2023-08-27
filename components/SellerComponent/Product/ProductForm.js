import MyInput from "@/components/01-Utils/Formik";
import { MyListbox, MyToggle } from "@/components/01-Utils/HeadlessUI";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { GoImage } from "react-icons/go";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const people = [
  { id: 1, name: "--Select cartegory--", value: "" },
  { id: 1, name: "Wade Cooper", value: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy", value: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb", value: "Devon Webb" },
  { id: 4, name: "Tom Cook", value: "Tom Cook" },
  { id: 5, name: "Tanya Fox", value: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt", value: "Hellen Schmidt" },
];
const ProductForm = () => {
  const [selectedCartegory, setSelectedCartegory] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [selectedBargain, setSelectedBargain] = useState({});
  const [descriptionValue, setDescriptionValue] = useState("");

  console.log(descriptionValue);

  const getSelectedBargain = (incomingData) => setSelectedBargain(incomingData);

  const getSelectedCartegory = (incomingData) => setSelectedCartegory(incomingData);
  const getSelectedType = (incomingData) => setSelectedType(incomingData);
  return (
    <Formik
      initialValues={{ product_name: "", cartegory: "", sub_cartegory: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form className="mt-4 w-full grid md:grid-cols-2 gap-x-4">
          {/* ADD THE DIV HERE */}
          <div className="md:pr-6">
            <div className="flex flex-col w-full">
              <div>
                <MyInput
                  name="product_name"
                  className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none  px-3 py-2 w-full bg-inherit text-sm font-semibold text-secondary-500"
                  label="Product Name"
                />
              </div>

              <div className="flex md:flex-row flex-col md:gap-x-4 md:gap-y-0 gap-y-4 w-full mb-2 items-baseline">
                <div className="w-full">
                  <MyInput
                    type="number"
                    name="in_stock"
                    className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none  px-6 py-2 w-full bg-inherit text-sm font-semibold text-secondary-500"
                    label="In Stock (Optional)"
                  />
                </div>

                <div className="flex w-full">
                  <MyToggle label="Allow Bargain" getSelectedData={getSelectedBargain} />
                </div>
              </div>

              <div className="flex md:flex-row flex-col md:gap-x-4 md:gap-y-0 gap-y-4 w-full mb-2">
                <div className="relative w-full">
                  <span className="absolute top-9 left-3 text-secondary-500">₦</span>
                  <MyInput
                    type="number"
                    name="price"
                    className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none  px-6 py-2 w-full bg-inherit text-sm font-semibold text-secondary-500"
                    label="Price"
                  />
                </div>
                <div className="relative w-full">
                  <span className="absolute top-9 left-3 text-secondary-500">₦</span>
                  <MyInput
                    type="number"
                    name="crossed_out_price"
                    className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none  px-6 py-2 w-full bg-inherit text-sm font-semibold text-secondary-500"
                    label="Crossed Out Price"
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="descriptopn" className="label_style">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  name="description"
                  className="md:h-[40vh] h-[35vh] bg-inherit text-sm font-semibold text-secondary-500"
                  value={descriptionValue}
                  onChange={setDescriptionValue}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 h-full">
            <div className="font-semibold flex text-sm items-center space-x-2">
              <span className="label_style">Product Images</span>
              <AiFillInfoCircle className="text-secondary-400" />
            </div>
            <div className="flex flex-row space-x-4">
              <div className="relative h-40 w-40 rounded-md">
                <Image
                  src="/assets/images/house09.jpg"
                  alt="product"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="border-dashed border-2 rounded-md border-secondary-400 h-40 w-40 text-center items-center text-sm text-secondary-500 font-semibold px-2 flex">
                <div className="flex flex-col w-full">
                  <GoImage className="text-4xl mx-auto" />
                  <div className="tracking-tight">
                    Drop your images here, or{" "}
                    <span className="tracking-tight cursor-pointer text-primary-600">
                      click to browse
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="my-4 font-semibold text-sm text-secondary-500">
              You need to add at least 3 images.
            </p>

            <div className="flex md:flex-row flex-col md:gap-x-4 md:gap-y-0 gap-y-4 w-full mb-2">
              <MyListbox
                options={people}
                label="Cartegory"
                getSelectedData={getSelectedCartegory}
                labelIcon={<AiFillInfoCircle className="text-secondary-400 text-base " />}
              />
              <MyListbox
                options={people}
                label="Type"
                getSelectedData={getSelectedType}
              />
            </div>
            <div>
              <MyInput
                name="brand"
                className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none  px-3 py-2 w-full bg-inherit text-sm font-semibold text-secondary-500"
                label="Brand"
              />
            </div>

            <div className="flex space-x-10 ">
              <button className="bg-primary-800  text-white  shadow-sm  px-6 py-2 rounded-button font-semibold text-sm ">
                Save Product
              </button>
              <button className="border-primary-800 text-primary-800  border-2   shadow-sm  px-6 py-2 rounded-button font-semibold text-sm ">
                Save to Draft
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
