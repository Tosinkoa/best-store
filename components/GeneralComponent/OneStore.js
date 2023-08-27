import { Tab } from "@headlessui/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillApi, AiOutlinePlus } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";
import StoreContactInfo from "../SellerComponent/Store/StoreContactInfo";
import ProductList from "./ProductList";
import { FaTools } from "react-icons/fa";

const OneStore = ({ showSetupButton, storeOwner }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { store_id } = router.query;

  /**
   * @TODO Remove Date joined from the seller dashboard social info
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
    <div className="space-y-2 flex flex-col relative scroll-mt-20" id="store-page-top">
      <div>
        <div className="grid md:grid-cols-2 gap-3 w-full p-4 items-center">
          <div className="flex flex-col relative h-48 ">
            <div className="h-[150px] w-[150px] relative flex flex-col mx-auto">
              <Image
                src="/assets/images/shop_icon01.png"
                alt="shop icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-2 truncate w-[80%] mx-auto text-center">
              <p className="  font-bold text-base md:text-lg">Guandow Store</p>
            </div>
          </div>
          <Tab.Group as="div" className="gap-y-2 flex flex-col h-48 ">
            <Tab.List
              as="div"
              className="w-fit flex mx-auto justify-between flex-row space-x-4"
            >
              <Tab className="profile_component_tabs_button">
                <AiFillApi className="text-xl" />
                <span>Connect</span>
              </Tab>
              <Tab as="div" className="profile_component_tabs_button">
                <BsInfoSquare className="text-xl" />
                <span>About</span>
              </Tab>
            </Tab.List>
            {/* Store Contact Info */}
            <Tab.Panels as="div" className="h-full">
              <Tab.Panel as="div">
                <StoreContactInfo />
              </Tab.Panel>
              <Tab.Panel
                as="div"
                className="flex w-full border-t border-secondary-300 rounded-md overflow-y-auto h-[90%] p-3"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        {!isVisible && (
          <Link
            href={`/stores/${store_id}#store-page-top`}
            passHref
            className="fixed bg-secondary-50 z-50 top-[55px] left-0 lg:left-[250px] py-2 px-3 rounded-sm drop-shadow-lg shadow-lg shadow-secondary-600 flex flex-row items-center w-fit md:max-w-[50%] sm:max-w-[70%] "
          >
            <div className="h-10 w-10 relative flex mx-auto">
              <Image
                src="/assets/images/shop_icon01.png"
                alt="shop icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="font-bold line-clamp-1">Guandow Store</p>
          </Link>
        )}
        {/* {storeOwner && (
          <button className="px-5 py-1.5 font-semibold rounded-md ml-auto flex text-secondary-50 mr-4 shadow-sm bg-gradient-to-tr from-primary-800 to-primary-500 items-center space-x-2 ring-2">
            <AiOutlinePlus className="text-white text-2xl" />
            <span>Add Product</span>
          </button>
        )} */}
        <div
          className="border-b border-secondary-400 flex lg:mx-10 md:mx-3 mt-4 "
          id="store-details"
        ></div>
      </div>
      <div className="lg:px-10 md:px-3">
        <ProductList />
      </div>
    </div>
  );
};

export default OneStore;
