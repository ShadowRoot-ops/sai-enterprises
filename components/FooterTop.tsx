import React from "react";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { TbRefresh } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}
const data: ContactItemData[] = [
  {
    title: "Need Help?",
    subtitle: "Chat with our support team",
    icon: <HiOutlineChatBubbleBottomCenterText size={24} />,
  },
  {
    title: "Easy Returns",
    subtitle: "7-day hassle-free return policy",
    icon: <TbRefresh size={24} />,
  },
  {
    title: "Secure Checkout",
    subtitle: "100% safe and encrypted payment",
    icon: <HiOutlineShieldCheck size={24} />,
  },
  {
    title: "Bulk & Custom Orders",
    subtitle: "Corporate gifts and wholesale deals",
    icon: <MdOutlineInventory2 size={24} />,
  },
];
const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 text-gray-800">
      {data.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="text-primary">{item.icon}</div>
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
{
  /* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-gray-50 text-gray-800">
      {data.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="text-primary">{item.icon}</div>
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div> */
}
