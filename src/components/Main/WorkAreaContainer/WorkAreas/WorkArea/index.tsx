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
import ToolsConctrol, { ToolsConctrolEventName } from "@/plugin/canvas/toolsConctrol";

/**
 * 工作区
 * @returns 
 */
export default function WorkArea({ workArea, toolsConctrol }: { toolsConctrol: ToolsConctrol, workArea: WorkAreaType }) {

  const style = workArea.active ? {} : { display: 'none' };

  const [zoomPercent, setZoomPercent] = useState('100%');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matrixConctrol, setConctrolMatrix] = useState<MatrixConctrol>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canvasConctrol, setCanvasConctrol] = useState<CanvasConctrol>(null);

  const [layerConctrol, setLayerConctrol] = useState<LayerConctrol>(null);


  const [canvasGroup, setCanvasGroup] = useState<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);

  useEffect(() => {
    toolsConctrol.on(ToolsConctrolEventName.active, (ev) => {
      console.log(ev);
    })
  }, [])

  useEffect(() => {
    if (canvas && canvasGroup) {
      setConctrolMatrix(new MatrixConctrol({
        container: canvasGroup,
        targer: canvas,
        matrixChange
      }));

      const _canvasConctrol = new CanvasConctrol(canvas, {
        backgroundColor: workArea.color
      });

      _canvasConctrol.on(CanvasConctrolEventName.init, layerConctrolHandle)

      _canvasConctrol.createCanvas();

      setCanvasConctrol(_canvasConctrol);
    }
  }, [canvas, canvasGroup]);

  function layerConctrolHandle(ev: CanvasConctrolEvent) {

    const _layerConctrol = new LayerConctrol();

    _layerConctrol.push({
      id: ev.targer.id,
      name: "背景",
      type: LayerType.background,
      active: false,
      visibility: true
    })

    _layerConctrol.on(layerEvent.visibility, (layer) => {
      ev.targer.visibility = layer.visibility;
      ev.sender.render();
    })

    setLayerConctrol(_layerConctrol)
  }

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

  function matrixChange(matrix: number[]) {
    setZoomPercent(Math.floor(Math.round(matrix[0] * 100)) + '%')
  }

  return (
    <div className={classNames(Style.workArea, 'flex')} style={style}>
      <div className={classNames(Style.leftPartition)}>
        <CanvasGroup canvasGroupRef={canvasGroupRef} canvasRef={canvasRef} width={workArea.width} height={workArea.height} />
        <WorkAreaInfoBar zoomPercent={zoomPercent} />
      </div>
      <div className={classNames(Style.rightPartition)}>
        <Layer canvasConctrol={layerConctrol} />
      </div>
    </div>
  )
}