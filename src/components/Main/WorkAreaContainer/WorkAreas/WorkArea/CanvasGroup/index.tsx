import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Canvas from "./Canvas";

/**
 * 工作区
 * @returns 
 */
export default function CanvasGroup({ width, height, canvasRef, canvasGroupRef }: { canvasGroupRef: (node: HTMLDivElement) => void, canvasRef: (node: HTMLCanvasElement) => void, width: number, height: number }) {

  return (
    <div ref={canvasGroupRef} className={classNames(Style.canvasGroup)} >
      <Canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}