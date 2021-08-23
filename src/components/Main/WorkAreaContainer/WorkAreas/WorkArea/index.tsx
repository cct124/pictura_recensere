import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import CanvasGroup from "@/components/Main/WorkAreaContainer/WorkAreas/WorkArea/CanvasGroup";
import { WorkAreaType } from "@/types/type.d";

/**
 * 工作区
 * @returns 
 */
export default function WorkArea({ workArea }: { workArea: WorkAreaType }) {
  const style = workArea.active ? {} : { display: 'none' };

  return (
    <div className={classNames(Style.workArea)} style={style}>
      <CanvasGroup width={workArea.width} height={workArea.height} color={workArea.color} />
    </div>
  )
}