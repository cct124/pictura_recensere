import React, { useState, useEffect } from "react";
import Style from "./index.modules.scss";
import { classNames, isArray } from '@/utils/tool';
import { Input, Animation } from "@/components/UI";


interface OptionEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  currentOption?: {
    label: string,
    value: string | number,
    i: number
  },
}

interface SelectMouseEvent extends MouseEvent {
  selectEvent?: boolean
}

export function Select({ className, value, setValue, placeholder, children }: { className?: string, placeholder?: string, value: string | number, setValue: React.Dispatch<unknown>, children: JSX.Element | JSX.Element[] }) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    label: '',
    value: null,
    i: null,
  });

  const childrenArr = (isArray(children) ? children : [children]) as JSX.Element[];

  const [childrenActiveControl, setChildrenActiveControl] = useState(childrenArr.map(e => {
    return { label: e.props.label, value: e.props.value, active: false }
  }));


  function onFocus() {
    setOptionsOpen(true);
  }

  function onOptionsClick(ev: OptionEvent) {
    (ev.nativeEvent as SelectMouseEvent).selectEvent = true;

    if (!ev.currentOption || inputValue.value === ev.currentOption.value) return;

    if (inputValue.i !== null) childrenActiveControl[inputValue.i].active = false
    setInputValue(ev.currentOption);
    setValue(ev.currentOption.value);
    childrenActiveControl[ev.currentOption.i].active = true;
    setChildrenActiveControl([...childrenActiveControl]);
    setOptionsOpen(false);
  }

  function closeOptions(ev: SelectMouseEvent) {
    if (!ev.selectEvent)
      setOptionsOpen(false);
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
      }
    }
  }, [value]);

  return (
    <div className={classNames('inline-block relative', className)} onClick={onOptionsClick}>
      <Input className={classNames('w-100p')} value={inputValue.label} placeholder={placeholder} setValue={setInputValue} onFocus={onFocus} />
      <Animation className={classNames(Style.options, 'absolute w-100p')} show={optionsOpen} inClass={classNames(Style.optionsIn)} outClass={classNames(Style.optionsOut)} duration={160}>
        {
          childrenActiveControl.map((e, i) => <Option label={e.label} value={e.value} active={e.active} i={i} key={e.value} />)
        }
      </Animation>
    </div>
  )
}

export function Option({ label, value, active, i }: { i?: number, active?: boolean, label: string, value: string | number }) {
  function onClick(ev: OptionEvent) {
    ev.currentOption = {
      label,
      value,
      i
    }
  }

  return (
    <div className={classNames(Style.option, 'pointer', active ? `${Style.optionActive} bold` : '')} onClick={onClick}>{label}</div>
  )
}