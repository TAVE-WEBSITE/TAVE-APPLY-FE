import Image from "next/image";

export type IconKeys =
  | "arrow"
  | "logo"
  | "calendar"
  | "user"
  | "file"
  | "message"
  | "mail"
  | "award"
  | "x"
  | "circleArrow"
  | "checkCircle"
  | "error";

const iconMap: Record<IconKeys, string> = {
  logo: "/tave-logo.svg",
  calendar: "/calendar.svg",
  user: "/user.svg",
  file: "/file.svg",
  award: "/award.svg",
  mail: "/mail.svg",
  message: "/message.svg",
  x: "/x.svg",
  arrow: "/arrow.svg",
  circleArrow: "/circle-arrow.svg",
  checkCircle: "/check-circle.svg",
  error: "/error.svg",
};

interface IconProps {
  name: IconKeys;
  width: number;
  height: number;
  alt?: string;
  isPriority?: boolean; // true면 우선적으로 로드
  className?: string;
}

const Icons = ({
  name,
  width,
  height,
  alt = name,
  isPriority = false,
  className,
}: IconProps) => {
  return (
    <Image
      src={iconMap[name]}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={isPriority}
    />
  );
};

export default Icons;
