import React, { useCallback, useEffect, useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Canvas from "./Canvas";
import ConctrolMatrix from "@/plugin/canvas/conctrolMatrix";

/**
 * 工作区
 * @returns 
 */
export default function CanvasGroup({ width, height, color }: { width: number, height: number, color: string }) {


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [conctrolMatrix, setConctrolMatrix] = useState(null);
  const [canvasGroup, setCanvasGroup] = useState<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas && canvasGroup) {
      setConctrolMatrix(new ConctrolMatrix({
        container: canvasGroup,
        targer: canvas,
      }))
    }
  }, [canvas, canvasGroup])

  const canvasGroupRef = useCallback(node => {
    if (node) {
      setCanvasGroup(node)
    }
  }, [])

  const canvasRef = useCallback(node => {
    if (node) {
      setCanvas(node)
    }
  }, [])

  return (
    <div ref={canvasGroupRef} className={classNames(Style.canvasGroup)} >
      <Canvas ref={canvasRef} width={width} height={height} style={{ backgroundColor: color }} />
    </div>
  )
}