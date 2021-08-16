import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export function ColorPicker({ className, size }: { className?: string, size?: 'medium' | 'small' | 'mini' }) {
  size = size || 'def' as 'mini';
  return (
    <div className={classNames(Style.colorPicker, Style[size], className)} style={{ backgroundColor: '#fff' }}>

    </div>
  )
}