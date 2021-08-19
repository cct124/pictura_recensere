import React from "react";
// import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export function CanvasReactComponent({ width, height, className }: { width: number, height: number, className?: string }) {
  return (
    <canvas className={classNames(className)} width={width} height={height} />
  )
}

export class Canvas {
  width: number;
  height: number;
  canvas: JSX.Element;
  
  constructor({ width, height }: { width: number, height: number }) {
    this.width = width;
    this.height = height;
    this.canvas = <CanvasReactComponent width={this.width} height={height} />
  }
}