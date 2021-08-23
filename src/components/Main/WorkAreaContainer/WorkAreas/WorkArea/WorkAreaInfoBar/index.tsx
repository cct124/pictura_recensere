import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * 工作区
 * @returns 
 */
export default function WorkAreaInfoBar({ zoomPercent }: { zoomPercent: string }) {
  return (
    <div className={classNames(Style.workAreaInfoBar)} >
      <div className={classNames(Style.zoomPercent, 'ft-sm flex-center')}>
        {zoomPercent}
      </div>
    </div>
  )
}