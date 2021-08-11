import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export default function Input({ size, type, className, placeholder, value, setValue }: { value: string | number, setValue: React.Dispatch<React.SetStateAction<unknown>>, type?: string, size?: string, className?: string, placeholder?: string }) {
  size = size || 'default';

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setValue(ev.target.value)
  }

  return (
    <input value={value} className={classNames(Style.input, Style[size], className)} placeholder={placeholder} type={type} onChange={onChange} />
  )
}