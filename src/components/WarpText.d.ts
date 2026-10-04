declare module "@/components/WarpText" {
  import type { CSSProperties } from "react";

  type WarpTextProps = {
    text?: string;
    color?: string;
    warpStrength?: number;
    warpScale?: number;
    speed?: number;
    pointerInfluence?: number;
    pointerStrength?: number;
    refraction?: number;
    ripple?: boolean;
    fontSize?: number | string;
    fontWeight?: number;
    fontFamily?: string;
    letterSpacing?: number | string;
    lineHeight?: number | string;
    className?: string;
    style?: CSSProperties;
  };

  export default function WarpText(props: WarpTextProps): React.JSX.Element;
}