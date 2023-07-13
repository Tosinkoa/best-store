import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BsCalendar3, BsGlobe, BsTelephoneFill, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { MdMailOutline } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

const StoreContactInfo = () => {
  return (
    <div className="flex flex-col gap-y-1 w-fit mx-auto items-center mt-2">
      <div className="flex flex-row text-sm items-center space-x-1 font-semibold text-secondary-600">
        <BsCalendar3 />
        <p>Joined Febuary 2007</p>
      </div>
      <div className="flex flex-row text-sm items-center space-x-1 font-semibold text-secondary-600">
        <BsTelephoneFill />
        <a href="tel:07061223915" className="text-blue-500 hover:underline cursor-pointer" passHref>
          07061223915
        </a>
      </div>
      <div className="flex flex-row text-sm items-center space-x-1 font-semibold text-secondary-600">
        <BsGlobe />
        <Link href="https://www.google.com" target="_blank" className="text-blue-500 hover:underline cursor-pointer" passHref>
          https://www.google.com
        </Link>
      </div>
      <div className="flex flex-row text-sm items-center space-x-1 font-semibold text-secondary-600">
        <MdMailOutline />
        <a href="mailto:tosinkoa1@gmail.com" className="text-blue-500 hover:underline cursor-pointer" passHref>
          tosinkoa1@gmail.com
        </a>
      </div>
      <div className="flex flex-row text-sm items-center space-x-1 font-semibold text-secondary-600">
        <GoLocation />
        <Link href="/map" className="text-blue-500 hover:underline cursor-pointer" passHref>
          Suite C63, Ikota Shopping Complex, VGC
        </Link>
      </div>
    </div>
  );
};

export default StoreContactInfo;
