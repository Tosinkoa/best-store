import Link from "next/link";
import { MdLocationPin, MdOutlinePhoneAndroid } from "react-icons/md";
import BestAppLogo from "../01Utils/BestAppLogo";
import { BsFillCartCheckFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-full h-fit p-4 py-6 pb-10 px-2 md:px-5 lg:px-12 md:grid-cols-2 border-t-2 border-primary-300 shadow-2xl">
      <div className="grid lg:grid-cols-4  gap-4 w-full h-fit">
        <div className="text-4xl mt-6">
          <div className="font-semibold flex items-center h-fit place-content-center w-fit bg-transparent text-primary-800">
            <span>BEST </span>
            <span>
              <BsFillCartCheckFill className="text-6xl" />
            </span>
            <span> STORE </span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 font-semibold">
          <h1 className="font-bold text-gray-600">Features</h1>
          <div className="flex flex-col space-y-2 font-medium">
            <Link href="/#">Articial Intelligence</Link>
            <Link href="/#">Music</Link>
            <Link href="/#">Video games</Link>
            <Link href="/#">Movie</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4 font-semibold">
          <h1 className="font-bold text-gray-600">Information</h1>
          <div className="flex flex-col space-y-2 font-medium">
            <Link href="/#">About Us</Link>
            <Link href="/#">Contact Us</Link>
            <Link href="/#">All Collection</Link>
            <Link href="/#">Blog</Link>
            <Link href="/#">In The Press</Link>
            <Link href="/#">Awards</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4 text-gray-500">
          <h1 className="font-bold text-gray-600">Contact Us</h1>
          <p>
            If you have any question, <br /> please contact us at{" "}
            <span className="text-primary-600 font-semibold">support@gmail.com</span>
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex text-2xl">
              <MdLocationPin />
            </div>
            <p>123 Sky Tower West 21th Street, Suria NY</p>
          </div>
          <div className="flex  items-center space-x-2">
            <div className="flex text-2xl">
              <MdOutlinePhoneAndroid />
            </div>
            <div>
              <p>+123 456 789 100 </p>
              <p>+001 987 654 321</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-4 gap-6">
        <div className="border-b"></div>
        <p className="w-fit mx-auto flex whitespace-nowrap text-center">
          Copyright © 2023 beststore.com. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
