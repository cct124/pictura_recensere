import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import system from '@/plugin/system';

export let setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;

export function ColorPicker({ value, setValue, className, size }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>, className?: string, size?: 'medium' | 'small' | 'mini' }) {
  size = size || 'def' as 'mini';
  
  setBackgroundColor = setValue;

  function openColorPickerWindow() {
    system.openColorPickerWindow(value);
  }

  return <div className={classNames(Style.colorPicker, Style[size], className)} style={{ backgroundColor: value }} onClick={openColorPickerWindow}></div>
}