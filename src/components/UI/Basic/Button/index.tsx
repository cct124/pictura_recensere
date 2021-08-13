import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export function Button({ children, size, type, className, onClick }: { onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, type?: 'primary' | 'success' | 'info' | 'warning' | 'danger', size?: string, className?: string, children?: unknown }) {
  size = size || 'defSize'
  type = type || 'defType' as 'primary'
  return (
    <button className={classNames(Style.button, Style[size], Style[type], 'tsn-normal', className)} onClick={onClick}>
      {children}
    </button>
  )
}