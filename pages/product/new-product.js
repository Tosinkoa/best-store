import { getLayout } from "@/components/Layouts/DashboardLayout";
import ProductForm from "@/components/SellerComponent/Product/ProductForm";
import ViewOneProductComponent from "@/components/SellerComponent/Product/ViewOneProductComponent";
import { Tab } from "@headlessui/react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEventNote } from "react-icons/md";

/**
 * @todo Product management page --> Where to select a product and edit or add new product
 * @todo Make colors gradient
 * @todo Add License, remove MIT
 */
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const NewProperty = () => {
  return (
    <div className="flex flex-col p-4 lg:p-8  h-full">
      <div className="justify-between w-full flex">
        <div className="font-semibold flex text-lg items-center space-x-2">
          <span className="text-primary-800">New Products</span>
          <AiFillQuestionCircle className="text-secondary-400" />
        </div>
        <div className="items-center flex space-x-3">
          <button className="hover:text-primary-800 hover:border-primary-800 focus:text-primary-800 focus:border-primary-800 text-secondary-500 border-secondary-400 shadow-sm border-2 px-4 py-1 rounded-button font-semibold text-sm ">
            Edit product
          </button>
          <button className="hover:text-primary-800 hover:border-primary-800 focus:text-primary-800 focus:border-primary-800 text-secondary-500 border-secondary-400 shadow-sm border-2 px-4 py-1 rounded-button font-semibold text-sm ">
            Add product
          </button>
          <button className="hover:text-primary-800 hover:border-primary-800 focus:text-primary-800 focus:border-primary-800 text-secondary-800 border-secondary-400 shadow-sm border-2 px-2 py-1 rounded-button font-semibold text-xl">
            <BsThreeDots />
          </button>
        </div>
      </div>
      <p className="my-4 font-semibold text-sm text-secondary-500 md:w-[75%] w-full">
        The most important feature in the product editing section is the product adding
        part. When adding products here, do not ignore to fill in all the required fields
        completely and follow the product adding rules
      </p>

      <Tab.Group as="div" className="flex flex-col w-full my-4 mb-0">
        <Tab.List className="border-b w-full flex space-x-6">
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 text-sm font-semibold outline-none",
                selected
                  ? "border-primary-800 text-primary-800  border-b-2"
                  : "text-secondary-500"
              )
            }
          >
            Product Setup
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 text-sm font-semibold flex space-x-1 items-center outline-none",
                selected
                  ? "border-primary-800 text-primary-800  border-b-2"
                  : "text-secondary-500"
              )
            }
          >
            <MdOutlineEventNote />
            <span>Preview</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProductForm />
          </Tab.Panel>
          <Tab.Panel className="md:h-fit w-full flex mt-4">
            <ViewOneProductComponent dontShowOtherProducts={false} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

NewProperty.getLayout = getLayout;
export default NewProperty;
