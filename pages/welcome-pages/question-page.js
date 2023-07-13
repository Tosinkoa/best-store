import Image from "next/legacy/image";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

const Question1 = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const questionData = [
    { image: "/assets/images/shop_icon01.png", text: "Become a Seller", animation: "animate-breathing-object" },
    { image: "/assets/images/mobile-shop.png", text: "Explore Marketplace", animation: "animate-quick-dance" },
  ];

  const handleOptionClick = (index) => {
    const stringIndex = index.toString();
    selectedOptions.includes(stringIndex)
      ? setSelectedOptions(selectedOptions.filter((option) => option !== stringIndex))
      : setSelectedOptions([...selectedOptions, stringIndex]);
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <div className=" w-11/12 lg:w-[50%] h-fit m-auto mt-[20vh] place-content-center text-center gap-y-10 flex flex-col">
        <div className="text-2xl font-bold ">Let's get started 🤗</div>
        <div className=" flex flex-row w-full md:space-x-4 space-x-2 justify-between">
          {questionData?.map((eachData, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`${
                selectedOptions.includes(index.toString()) ? "border-blue-600 border-2 " : "border-2"
              }  md:rounded-xl rounded-md  md:px-16 px-4 md:w-fit w-52  place-content-center  py-6 relative text-3xl`}
            >
              {selectedOptions.includes(index.toString()) ? (
                <BsCheckCircleFill className="absolute top-4 right-4 text-blue-600" />
              ) : (
                <BsCheckCircle className="absolute top-4 right-4 text-secondary-500" />
              )}
              <div className={`md:h-40 md:w-40 w-20 h-20 relative ${eachData.animation}  mx-auto`}>
                <Image src={eachData.image} alt="shop question" layout="fill" objectFit="cover" />
              </div>
              <p className="text-center font-bold text-secondary-800 mt-5 text-lg md:text-xl">{eachData.text}</p>
            </div>
          ))}
        </div>
        <div className="font-semibold flex flex-row justify-between w-full text-lg">
          <button className="w-fit flex rounded-md">Skip</button>
          <button className="w-fit flex rounded-md px-4 shadow-sm py-1 text-secondary-50 bg-primary-700">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Question1;
