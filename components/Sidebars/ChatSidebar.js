import { Form, Formik } from "formik";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import MyInput from "../01Utils/Formik";
import ChatList from "../Chat/ChatList";

const ChatSidebar = ({
  sidebarNavButtons,
  isMediumAndSmallScreen,
  showSmallScreenSidebar,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <div className="h-full bg-inherit w-[300px] fixed ml-[250px] border-r hidden lg:flex flex-col">
      <div className=" justify-between z-10 flex items-center px-2 border-r md:px-5 fixed w-[300px] left-[250px] bg-white h-[55px]">
        {showSearchInput && (
          <Formik
            className="w-full"
            initialValues={{ searchMessage: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form className="flex rounded-md w-full gap-x-2 place-content-center">
                <BsArrowLeft
                  onClick={() => setShowSearchInput(false)}
                  className="text-2xl left-4 inset-y-0 my-auto cursor-pointer"
                />
                <MyInput
                  type="search"
                  name="search-message"
                  className="rounded-md p-3 h-10 cursor-pointer w-full focus:border-secondary-300 border-secondary-300 focus:ring-0 border-1"
                />
              </Form>
            )}
          </Formik>
        )}
        {!showSearchInput && (
          <div className="flex flex-row items-center h-fit justify-between w-full">
            <div className="flex flex-row items-center gap-x-3">
              <h3 className="text-xl">Messages</h3>
              <p className="rounded-full h-7 w-7 items-center  flex place-content-center text-sm text-secondary-50 bg-red-500">
                2
              </p>
            </div>
            <div
              onClick={() => setShowSearchInput(true)}
              className="text-3xl rounded-full cursor-pointer"
            >
              <FiSearch />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 overflow-y-auto mt-[55px] h-[calc(100%_-_55px)]">
        <ChatList />
      </div>
    </div>
  );
};

export default ChatSidebar;
