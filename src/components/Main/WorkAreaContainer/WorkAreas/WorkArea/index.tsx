import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
export default function WorkArea() {

  return (
    <div className={classNames(Style.WorkArea)}>
      WorkArea
    </div>
  )
}