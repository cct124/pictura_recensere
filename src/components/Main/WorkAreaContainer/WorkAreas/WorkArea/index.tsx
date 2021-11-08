import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import CanvasGroup from "./CanvasGroup";
import WorkAreaInfoBar from "./WorkAreaInfoBar";
import Layer from "./Layer";
import { WorkAreaType } from "@/types/type.d";
import MatrixConctrol from "@/plugin/canvas/matrixConctrol";
import CanvasConctrol, { CanvasConctrolEvent, CanvasConctrolEventName } from "@/plugin/canvas/CanvasConctrol";
import LayerConctrol, { layerEvent, LayerType } from "@/plugin/canvas/layerConctrol";
import ToolsConctrol, { Tool, ToolsConctrolEventName } from "@/plugin/canvas/toolsConctrol";
import InteractiveConctrol, { InteractiveEventName, RectParamsType } from "@/plugin/canvas/interactiveConctrol";

/**
 * 工作区
 * @returns 
 */
export default function WorkArea({ canvasInfo, toolsConctrol }: { toolsConctrol: ToolsConctrol, canvasInfo: WorkAreaType }) {

  const style = canvasInfo.active ? {} : { display: 'none' };

  const [zoomPercent, setZoomPercent] = useState('100%');

  const [layerConctrol, setLayerConctrol] = useState<LayerConctrol>(null);

  const [interactiveConctrol, setInteractiveConctrol] = useState<InteractiveConctrol>(null);

  return (
    <div className={classNames(Style.workArea, 'flex')} style={style}>
      <div className={classNames(Style.leftPartition)}>
        <CanvasGroup />
        <WorkAreaInfoBar zoomPercent={zoomPercent} />
      </div>
      <div className={classNames(Style.rightPartition)}>
        <Layer canvasConctrol={layerConctrol} />
      </div>
    </div>
  )
}