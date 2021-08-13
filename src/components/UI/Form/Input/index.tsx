import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export function Input({ size, type, className, placeholder, value, setValue, onBlur, onFocus, onChange }: { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void, onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void, value: string | number, setValue: React.Dispatch<React.SetStateAction<unknown>>, type?: string, size?: string, className?: string, placeholder?: string }) {
  size = size || 'default';

  function onChangeHandle(ev: React.ChangeEvent<HTMLInputElement>) {
    setValue(ev.target.value);
    onChange(ev);
  }

  return (
    <input value={value} className={classNames(Style.input, Style[size], className)} placeholder={placeholder} type={type} onChange={onChangeHandle} onBlur={onBlur} onFocus={onFocus} />
  )
}