import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';


export default function ColorPickerWindow() {
  return <div className={classNames(Style.ColorPicker)}>ColorPickerWindow</div>
}