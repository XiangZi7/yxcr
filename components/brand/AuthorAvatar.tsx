import Image from "next/image";
import avatar from "@/public/images/xiangzi7-avatar.png";
import { author } from "@/lib/site";

export function AuthorAvatar({
  size = 40,
  className = "",
  decorative = false,
}: {
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src={avatar}
      width={size}
      height={size}
      sizes={`${size}px`}
      alt={decorative ? "" : `${author.name} 的 GitHub 头像`}
      className={`author-avatar ${className}`}
    />
  );
}
