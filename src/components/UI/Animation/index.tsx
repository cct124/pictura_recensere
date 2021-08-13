import React, { useState, useEffect } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * 动画 Hook 适用于显示和隐藏组件的控制
 * @param param.inClass  开始 Animation ClassName
 * @param param.outClass  结束 Animation ClassName
 * @param param.show  控制开始和结束
 * @param param.duration  结束时长
 * @returns 
 */
export function Animation({
  className,
  children,
  inClass,
  outClass,
  show,
  duration,
}: {
  className?: string,
  children: JSX.Element | JSX.Element[],
  inClass: string;
  outClass: string;
  show: boolean;
  duration: number;
}) {
  const [showControl, setShowControl] = useState(false);
  const [animationControl, setAnimationControl] = useState(false);

  useEffect(() => {
    if (show === true) {
      setShowControl(true)
      setAnimationControl(true)
    }

    if (show === false) {
      setAnimationControl(false);

      const asyncId = setTimeout(() => {
        setShowControl(false)
      }, duration);

      return () => {
        clearTimeout(asyncId)
      }
    }
  }, [show]);

  return (
    showControl ? (
      <div className={classNames(className, animationControl ? inClass : outClass)}>
        {children}
      </div>
    ) : <></>
  )
}
