import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

import WorkAreas from "@/components/Main/WorkAreaContainer/WorkAreas";
/**
 * 工作区容器
 * @returns 
 */
export default function WorkAreaContainer() {

  return (
    <div className={classNames(Style.workAreaContainer, 'flex')}>
      <WorkAreas />
    </div>
  )
}