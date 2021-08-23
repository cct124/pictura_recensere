import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import CanvasGroup from "./CanvasGroup";
import WorkAreaInfoBar from "./WorkAreaInfoBar";
import { WorkAreaType } from "@/types/type.d";
import MatrixConctrol from "@/plugin/canvas/matrixConctrol";
import CanvasConctrol from "@/plugin/canvas/canvasConctrol";

/**
 * 工作区
 * @returns 
 */
export default function WorkArea({ workArea }: { workArea: WorkAreaType }) {
  const style = workArea.active ? {} : { display: 'none' };
  const [zoomPercent, setZoomPercent] = useState('100%');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matrixConctrol, setConctrolMatrix] = useState<MatrixConctrol>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canvasConctrol, setCanvasConctrol] = useState<CanvasConctrol>(null);

  const [canvasGroup, setCanvasGroup] = useState<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas && canvasGroup) {
      setConctrolMatrix(new MatrixConctrol({
        container: canvasGroup,
        targer: canvas,
        matrixChange
      }));

      setCanvasConctrol(new CanvasConctrol(canvas, {
        backgroundColor: workArea.color
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

      </div>
    </div>
  )
}