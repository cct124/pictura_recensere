import React from "react";
// import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * 画布
 */
export default React.forwardRef(({ width, height, className }: { width: number, height: number, className?: string }, ref: React.LegacyRef<HTMLCanvasElement>) => {
  return (
    <canvas ref={ref} className={classNames(className)} width={width} height={height} />
  )
}
)