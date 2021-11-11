import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import { WorkAreaType } from "@/types/type.d";
import ToolsConctrol from "@/plugin/canvas/toolsConctrol";
import Canvas from "@/plugin/canvas";

/**
 * 工作区
 * @returns 
 */
export default function WorkArea({ canvasInfo, toolsConctrol }: { toolsConctrol: ToolsConctrol, canvasInfo: WorkAreaType }) {

  const style = canvasInfo.active ? {} : { display: 'none' };
  const [canvas, setCanvas] = useState<Canvas>(null)

  const canvasContainer = useCallback((node: HTMLDivElement) => {
    if (node) {
      const canvas = new Canvas({
        container: node,
        width: node.offsetWidth,
        height: node.offsetHeight
      })
      setCanvas(canvas);
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      const { width, height } = canvasInfo;
      canvas.createCanvas({ width, height, id: 'canvas_01', x: canvas.statg.width() / 2, y: canvas.statg.height() / 2 });
    }
  }, [canvas])

  return (
    <div className={classNames(Style.workArea, 'flex', 'hidden')} ref={canvasContainer} style={style}>

    </div>
  )
}