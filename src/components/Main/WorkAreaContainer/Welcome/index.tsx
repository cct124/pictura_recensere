import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export default function Welcome() {
  return (
    <div className={classNames(Style.welcome)}>
      welcome
    </div>
  )
}