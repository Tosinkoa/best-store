import { BiSolidPhoneCall, BiSupport } from "react-icons/bi";
import { BsWalletFill } from "react-icons/bs";
import { FaStoreAlt } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";

const LandingPageInsight = () => {
  const insightData = [
    {
      id: 1,
      icon: <BsWalletFill />,
      topic: "Secure Payment",
      text: "Fast transaction with 100% secure payment.",
    },
    {
      id: 2,
      icon: <IoMdChatboxes />,
      topic: "Connect with People",
      text: "Meet people who share your interests in the group chat.",
    },
    {
      id: 3,
      icon: <BiSupport />,
      topic: "Customer Service Support",
      text: "Dedicated support anytime and anywhere.",
    },
    {
      id: 4,
      icon: <FaStoreAlt />,
      topic: "Buy or Sell",
      text: "Buying and selling products has been made easier.",
    },
  ];

  return (
    <div className="landing_page_insight">
      {insightData.map((eachInsightData) => (
        <div key={eachInsightData.id} className="landing_page_insight_children">
          <div className="landing_page_insight_icon_bg">
            <div className="landing_page_insight_icon_sec_bg">{eachInsightData.icon}</div>
          </div>
          <div className="landing_page_insight_text">
            <h1>{eachInsightData.topic}</h1>
            <p>{eachInsightData.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingPageInsight;
