import { useId } from "react";
import { scallopPath } from "../utils/scallop";

const SEAL = scallopPath(50, 50, 49);

/** The "F" with a leaf, drawn to match the FROZZY badge. */
const FMark = ({ color }: { color: string }) => (
  <g fill={color}>
    <path d="M40 34h21v7.5H48.5v6H59V55H48.5v12H40z" />
    <path d="M52.5 31.5c4-7 11.5-9 16-8.5-1 5.5-5.5 11-13.5 12z" />
  </g>
);

interface SealProps {
  className?: string;
  /** seal background */
  fill?: string;
  /** text + inner disc colour */
  ink?: string;
  title?: string;
}

/** Full circular badge: FROZZY across the top, FROZEN FOODS around the bottom. */
export function Seal({ className, fill = "#FFF7E8", ink = "#005541", title = "FROZZY Frozen Foods" }: SealProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      <path d={SEAL} fill={fill} />
      <defs>
        <path id={`top-${id}`} d="M17 50a33 33 0 0 1 66 0" />
        <path id={`bot-${id}`} d="M13.5 50a36.5 36.5 0 0 0 73 0" />
      </defs>
      <text fill={ink} fontFamily='"DM Serif Display", Georgia, serif' fontSize="13" letterSpacing="2.2">
        <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">
          FROZZY
        </textPath>
      </text>
      <text fill={ink} fontFamily='"DM Sans", sans-serif' fontWeight="600" fontSize="7.6" letterSpacing="1.6">
        <textPath href={`#bot-${id}`} startOffset="50%" textAnchor="middle">
          FROZEN FOODS
        </textPath>
      </text>
      <circle cx="21" cy="55" r="1.4" fill={ink} />
      <circle cx="79" cy="55" r="1.4" fill={ink} />
      <circle cx="50" cy="50" r="19" fill={ink} />
      <g transform="translate(50 50) scale(.5) translate(-52 -47)">
        <FMark color={fill} />
      </g>
    </svg>
  );
}

/** Compact logo for the navbar: small seal + wordmark. */
export function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? "#FFF7E8" : "#005541";
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 100 100" className="h-10 w-10 shrink-0" aria-hidden="true">
        <path d={SEAL} fill={ink} />
        <FMark color={light ? "#005541" : "#FFF7E8"} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] tracking-[0.06em]" style={{ color: ink }}>
          FROZZY
        </span>
        <span className="mt-0.5 text-[0.58rem] font-semibold tracking-[0.32em]" style={{ color: ink, opacity: 0.75 }}>
          FROZEN FOODS
        </span>
      </span>
    </span>
  );
}
