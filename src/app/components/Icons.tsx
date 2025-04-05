import Image from "next/image";

export type IconKeys =
  | "logoSm"
  | "logo"
  | "calendar"
  | "user"
  | "file"
  | "award";

const iconMap: Record<IconKeys, string> = {
  logoSm: "/tave-logo-sm.svg",
  logo: "/tave-logo.svg",
  calendar: "/calendar.svg",
  user: "/user.svg",
  file: "/file.svg",
  award: "/award.svg",
};

interface IconProps {
  name: IconKeys;
  width: number;
  height: number;
  alt?: string;
  isPriority?: boolean; // true면 우선적으로 로드
  className?: string;
}

export const Icons = ({
  name,
  width,
  height,
  alt = name,
  isPriority = false,
  className,
}: IconProps) => {
  return isPriority ? (
    <Image
      src={iconMap[name]}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority
    />
  ) : (
    <Image
      src={iconMap[name]}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};
