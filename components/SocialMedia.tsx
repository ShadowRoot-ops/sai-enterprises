import React from "react";
import { SiFacebook, SiLinkedin, SiPinterest, SiX } from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Facebook",
    href: "#",
    icon: <SiFacebook className="w-5 h-5" />,
  },
  {
    title: "Twitter",
    href: "#",
    icon: <SiX className="w-5 h-5" />,
  },
  {
    title: "Pinterest",
    href: "#",
    icon: <SiPinterest className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "#",
    icon: <SiLinkedin className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                key={item?.title}
                target="_blank"
                rel="noopener noreferrer"
                href={item?.href}
                className={cn(
                  "p-2 border rounded-full hover:text-white border-orange-400 hoverEffect",
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-black font-semibold",
                tooltipClassName
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
{
  /* <div className="flex gap-4">
      {socialLink.map((item) => (
        <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.title}
          className="hover:text-orange-400 transition-colors"
        >
          {item.icon}
        </a>
      ))}
    </div> */
}
