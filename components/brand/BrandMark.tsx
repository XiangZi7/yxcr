/** A folded X: a graphite ribbon crossed by a quiet blue plane. */
export function BrandMark({
  size = 32,
  className,
  id = "yxcr-mark",
}: {
  size?: number;
  className?: string;
  id?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`${id}-surface`}
          x1="5"
          y1="2"
          x2="34"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E8EEF6" />
        </linearGradient>
        <linearGradient
          id={`${id}-edge`}
          x1="8"
          y1="0"
          x2="30"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CAD5E3" />
        </linearGradient>
        <linearGradient
          id={`${id}-ink`}
          x1="12"
          y1="11"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#566780" />
          <stop offset="1" stopColor="#24344C" />
        </linearGradient>
        <linearGradient
          id={`${id}-blue`}
          x1="29"
          y1="11"
          x2="15"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FA9DE" />
          <stop offset="1" stopColor="#4E77B1" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill={`url(#${id}-surface)`}
        stroke={`url(#${id}-edge)`}
      />
      <rect
        x="2.25"
        y="2.25"
        width="35.5"
        height="35.5"
        rx="9.75"
        stroke="white"
        strokeOpacity=".65"
        strokeWidth=".5"
      />
      <path d="M24 11H29.5L16 29H10.5L24 11Z" fill={`url(#${id}-blue)`} />
      <path d="M10.5 11H16L29.5 29H24L10.5 11Z" fill={`url(#${id}-ink)`} />
      <path
        d="M16.1 11.75L28.35 28.25"
        stroke="white"
        strokeOpacity=".16"
        strokeWidth=".6"
      />
    </svg>
  );
}
