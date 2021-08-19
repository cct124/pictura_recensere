import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Tools from '@/components/Main/WorkArea/Tools';

export default function WorkAreaContainer() {
  return (
    <div className={classNames(Style.WorkAreaContainer)}>
      <Tools />
      <div className={classNames(Style.WorkArea)}>

      </div>
    </div>
  )
}