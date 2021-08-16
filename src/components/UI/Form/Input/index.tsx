import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * # Input 输入框
 * 通过鼠标或键盘输入字符
 * 
 * ## Example
 * ```tsx
 * <Input className={classNames('w-100p')} value={title} setValue={setTitle} placeholder="标题" />
 * ```
 * @param param0.size 输入框的尺寸 medium / small / mini
 * @param param0.type 类型 string	text，textarea 和其他 原生 input 的 type 值
 * @param param0.value 绑定的 value
 * @param param0.setValue 绑定的 setValue
 * @returns 
 */
export const Input = React.forwardRef(({ size, type, className, placeholder, value, setValue, onBlur, onFocus, onChange }: { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void, onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void, value: string | number, setValue: React.Dispatch<React.SetStateAction<unknown>>, type?: string, size?: string, className?: string, placeholder?: string }, ref: React.LegacyRef<HTMLInputElement>) => {
  size = size || 'default';

  function onChangeHandle(ev: React.ChangeEvent<HTMLInputElement>) {
    setValue(ev.target.value);
    if (onChange) onChange(ev);
  }

  return (
    <input ref={ref} value={value} className={classNames(Style.input, Style[size], className)} placeholder={placeholder} type={type} onChange={onChangeHandle} onBlur={onBlur} onFocus={onFocus} />
  )
})