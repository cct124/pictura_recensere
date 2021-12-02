import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import { WorkAreaType } from "@/types/type.d";
import ToolsConctrol from "@/plugin/canvas/toolsConctrol";
import Work from "@/plugin/konva/work";
import Canvas from '@/plugin/konva/canvas';
import symbol from "@/plugin/symbol";
import InteractiveConctrol, { ICEventType } from "@/plugin/canvas/interactiveConctrol";
import { KonvaEventObject } from "konva/lib/Node";

/**
 * 工作区
 * @returns 
 */
export default function WorkArea({ canvasInfo, toolsConctrol }: { toolsConctrol: ToolsConctrol, canvasInfo: WorkAreaType }) {

  const style = canvasInfo.active ? {} : { display: 'none' };
  const [work, setWork] = useState<Work>(null)

  const canvasContainer = useCallback((node: HTMLDivElement) => {
    if (node) {
      const { width, height, id } = canvasInfo;
      node.focus();
      const work = new Work({
        container: node,
        width: node.offsetWidth,
        height: node.offsetHeight,
        tabIndex: id,
      })
      setWork(work);
      const interactiveConctrol = new InteractiveConctrol({
        container: node,
        work,
      });
      interactiveConctrol.on(ICEventType.mousewheelAltLeft, (ev) => work.mousewheelScale(ev.targer as KonvaEventObject<WheelEvent>));
      interactiveConctrol.on(ICEventType.spaceMouseLeftDownMove, (ev) => {
        console.log(ev);
      })
      const canvas = new Canvas({ width, height, id: symbol.canvas.id(work.canvas.size), x: work.width / 2, y: work.height / 2 });
      work.add(canvas);
    }
  }, []);

  return (
    <div className={classNames(Style.workArea, 'flex', 'hidden')} ref={canvasContainer} style={style}>

    </div>
  )
}