import { AiFillShop, AiTwotoneSetting } from "react-icons/ai";
import { BsBellFill, BsFillChatFill, BsFillPersonFill } from "react-icons/bs";
import { FaHeart, FaHistory, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

export const sidebarNavButtons = [
  {
    linkParams: "/product",
    icon: <FaShoppingBag />,
    name: "Shop",
  },
  {
    linkParams: "/chat",
    icon: <BsFillChatFill />,
    name: "Chat",
  },
  {
    linkParams: "/business",
    icon: <AiFillShop />,
    name: "Business",
  },
  {
    linkParams: "/cart",
    icon: <FaShoppingCart />,
    name: "Cart",
  },
  {
    linkParams: "/sale-history",
    icon: <FaHistory />,
    name: "Sale History",
  },
  {
    linkParams: "/saved-item",
    icon: <FaHeart />,
    name: "Saved Item",
  },
  {
    linkParams: "/my-business",
    icon: <BsFillPersonFill />,
    name: "My Business",
  },
  {
    linkParams: "/notifications",
    icon: <BsBellFill />,
    name: "Notifications",
  },
  {
    linkParams: "/settings",
    icon: <AiTwotoneSetting />,
    name: "Settings",
  },
];
