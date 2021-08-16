import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import system from '@/plugin/system';

export function ColorPicker({ className, size }: { className?: string, size?: 'medium' | 'small' | 'mini' }) {
  size = size || 'def' as 'mini';

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  function openColorPickerWindow() {
    system.openColorPickerWindow();
  }

  return <div className={classNames(Style.colorPicker, Style[size], className)} style={{ backgroundColor }} onClick={openColorPickerWindow}></div>
}