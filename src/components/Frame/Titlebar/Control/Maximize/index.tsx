import React, { useState } from "react";
import './index.scss';
import system from '@/plugin/system';
import MaximizeNormalSvg from '@/assets/svg/maximize_normal.svg';
import MaximizeSvg from '@/assets/svg/maximize.svg';

export let setIsMaximize: React.Dispatch<React.SetStateAction<boolean>>;

/**
 * 最大化窗口或取消窗口最大化
 * @returns 
 */
export default function Maximize() {
  const state = useState(false);
  const isMaximize = state[0];
  setIsMaximize = state[1];

  function maximize() {
    isMaximize ? system.unmaximize() : system.maximize()
  }

  return (
    <div className="maximize flex-center" onClick={maximize}>{isMaximize ? <MaximizeSvg /> : <MaximizeNormalSvg />}</div>

  );
}