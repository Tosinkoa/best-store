import { BsFillCartCheckFill } from "react-icons/bs";

const BestAppLogo = () => {
  return (
    <div className=" font-extrabold flex items-center h-fit  place-content-center w-fit bg-transparent ">
      <span>BEST </span>
      <span>
        <BsFillCartCheckFill className="text-4xl " />
      </span>
      <span> STORE </span>
    </div>
  );
};

export default BestAppLogo;
