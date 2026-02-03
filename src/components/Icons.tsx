import Image from "next/image";

export type IconKeys =
  | "arrow"
  | "logo"
  | "calendar"
  | "user"
  | "file"
  | "fileGray"
  | "message"
  | "mail"
  | "award"
  | "x"
  | "circle"
  | "check"
  | "upload";

const iconMap: Record<IconKeys, string> = {
  logo: "/tave-logo.svg",
  calendar: "/calendar.svg",
  user: "/user.svg",
  file: "/file.svg",
  fileGray: "file-gray.svg",
  award: "/award.svg",
  mail: "/mail.svg",
  message: "/message.svg",
  x: "/x.svg",
  arrow: "/arrow.svg",
  circle: "/circle.svg",
  check: "/check.svg",
  upload: "/upload.svg",
};

interface IconProps {
  name: IconKeys;
  width: number;
  height: number;
  alt?: string;
  isPriority?: boolean;
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
