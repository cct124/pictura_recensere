import React, { useCallback, useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * 画布组
 * @returns 
 */
export default function CanvasGroup() {

  const [canvasGroup, setCanvasGroup] = useState<HTMLDivElement>(null);

  const canvasGroupRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setCanvasGroup(node)
    }
  }, []);

  return (
    <div ref={canvasGroupRef} className={classNames(Style.canvasGroup)} >
      {canvasGroup ? <canvas width={canvasGroup.offsetWidth} height={canvasGroup.offsetHeight}></canvas> : ''}
    </div>
  )
}