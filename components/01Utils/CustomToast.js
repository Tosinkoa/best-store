import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CloseButton = ({ closeToast }) => (
  <AiOutlineClose className="text-xl" onClick={closeToast} />
);

const CustomToast = () => {
  return (
    <ToastContainer
      closeButton={CloseButton}
      toastStyle={{ color: "#7e22ce", backgroundColor: "white" }}
      theme="colored"
      autoClose={8000}
    />
  );
};

export default CustomToast;
