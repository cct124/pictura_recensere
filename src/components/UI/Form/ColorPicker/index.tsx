import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import system from '@/plugin/system';
import { random } from "@/utils/random";
export let setBackgroundColor: (value: string, id: number) => void;

export function ColorPicker({ value, setValue, className, size, title }: { title?: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>, className?: string, size?: 'medium' | 'small' | 'mini' }) {
  size = size || 'def' as 'mini';
  title = title || '拾色器'

  const [colorPickerId, setColorPickerId] = useState(random())

  setBackgroundColor = (value: string, id: number) => {
    if (colorPickerId === id) {
      setValue(value)
    }
  };

  function openColorPickerWindow() {
    system.openColorPickerWindow(value, colorPickerId);
  }

  return <div title={title} className={classNames(Style.colorPicker, Style[size], className)} style={{ backgroundColor: value }} onClick={openColorPickerWindow}></div>
}