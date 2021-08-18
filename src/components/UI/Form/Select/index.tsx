import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames, isArray } from '@/utils/tool';
import { Input, Animation } from "@/components/UI";

import ChevronLeftSvg from '@/assets/svg/chevron_left.svg'

interface OptionEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  currentOption?: {
    label: string,
    value: string | number,
    i: number
  },
}

interface SelectMouseEvent extends MouseEvent {
  selectEvent?: number
}

/**
 * # Select 选择器
 * 当选项过多时，使用下拉菜单展示并选择内容。
 *
 * ## Example
 * ```tsx
 * <Select className={classNames('mar-l-5')} value={sizeUnit} setValue={setSizeUnit}>
 *  <Option label="像素" value={'px'} />
 * </Select>
 * ```
 * @param param0.value 绑定的 Value
 * @param param0.setValue 绑定的 setValue
 * @returns 
 */
export function Select({ className, value, setValue, placeholder, children, strictMatch }: { strictMatch?: boolean, className?: string, placeholder?: string, value: string | number, setValue: React.Dispatch<unknown>, children: JSX.Element | JSX.Element[] }) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    label: '',
    value: null,
    i: null,
  });
  const [inputDOM, setIputDOM] = useState<HTMLInputElement>(null);


  const childrenArr = (isArray(children) ? children : [children]) as JSX.Element[];

  const [childrenActiveControl, setChildrenActiveControl] = useState(childrenArr.map(e => {
    return { label: e.props.label, value: e.props.value, active: false }
  }));

  const [selectRadom,] = useState(Date.now() + Math.round(Math.random() * 10000));

  // input 获取焦点时 打开Options选项列表
  function onFocus() {
    setOptionsOpen(true);
  }

  // 监听 Options 选项列表点击事件 将点击的选项选中处理
  function onOptionsClick(ev: OptionEvent) {
    (ev.nativeEvent as SelectMouseEvent).selectEvent = selectRadom;

    if (ev.currentOption && inputValue.value !== ev.currentOption.value) {
      if (inputValue.i !== null) childrenActiveControl[inputValue.i].active = false
      setInputValue(ev.currentOption);
      setValue(ev.currentOption.value);
      childrenActiveControl[ev.currentOption.i].active = true;
      setChildrenActiveControl([...childrenActiveControl]);
      setOptionsOpen(false);
    }

    if (ev.currentOption && inputValue.value === ev.currentOption.value) setOptionsOpen(false);

  }

  // 选项列表关闭处理
  function closeOptions(ev: SelectMouseEvent) {
    if (ev.selectEvent !== selectRadom && optionsOpen === true) {
      if (childrenActiveControl.map(chil => chil.label).includes(inputValue.label) === false) {
        if (inputValue.i !== null) childrenActiveControl[inputValue.i].active = false
        setChildrenActiveControl([...childrenActiveControl]);

        setInputValue({
          label: '',
          value: null,
          i: null,
        });

      }
      inputDOM.blur();
      setOptionsOpen(false);
    }
  }


  useEffect(() => {
    document.addEventListener('click', closeOptions)
    return () => {
      document.removeEventListener('click', closeOptions)
    }
  })

  useEffect(() => {
    if (inputValue.value !== value) {
      for (const [i, iterator] of childrenActiveControl.entries()) {
        if (iterator.value === value) {
          if (inputValue.i !== null) childrenActiveControl[inputValue.i].active = false
          setInputValue({
            label: iterator.label,
            value: iterator.value,
            i
          });
          childrenActiveControl[i].active = true;
          setValue(iterator.value);
          setChildrenActiveControl([...childrenActiveControl]);
          return
        }

        if (!strictMatch) {
          if (inputValue.i !== null) childrenActiveControl[inputValue.i].active = false

          setInputValue({
            label: value.toString(),
            value: value,
            i: null
          });

          setValue(value);

          setChildrenActiveControl([...childrenActiveControl]);

        }
      }
    }
  }, [value]);

  function setInputValueHandle(text: string) {
    setInputValue({
      ...inputValue,
      label: text,
    });
  }

  const inputRef = useCallback((node: HTMLInputElement) => {
    if (node !== null) {
      setIputDOM(node);
    }
  }, []);

  return (
    <div className={classNames('inline-block relative', className)} onClick={onOptionsClick}>
      <div className={classNames(Style.selectInputContainer, 'relative')}>
        <Input ref={inputRef} className={classNames(Style.selectInput, 'w-100p')} value={inputValue.label} placeholder={placeholder} setValue={setInputValueHandle} onFocus={onFocus} />
        <div className={classNames(Style.arrow, optionsOpen ? Style.arrowOptionsOpen : Style.arrowOptionsClose)}>
          <ChevronLeftSvg />
        </div>
      </div>
      <Animation className={classNames(Style.options, 'absolute w-100p')} show={optionsOpen} inClass={classNames(Style.optionsIn)} outClass={classNames(Style.optionsOut)} duration={160}>
        {
          childrenActiveControl.map((e, i) => <Option label={e.label} value={e.value} active={e.active} i={i} key={e.value} />)
        }
      </Animation>
    </div>
  )
}

/**
 * # Option 组件
 * Select 选择器的子组件
 * 
 * ## Example
 * ```tsx
 * <Select className={classNames('mar-l-5')} value={sizeUnit} setValue={setSizeUnit}>
 *  <Option label="像素" value={'px'} />
 * </Select>
 * ```
 * @param param0.label 选项的标签
 * @param param0.value 选项的值
 * @returns 
 */
export function Option({ label, value, active, i }: { i?: number, active?: boolean, label: string, value: string | number }) {
  function onClick(ev: OptionEvent) {
    ev.currentOption = {
      label,
      value,
      i
    }
  }

  return (
    <div className={classNames(Style.option, 'pointer', active ? Style.optionActive : '')} onClick={onClick}>{label}</div>
  )
}