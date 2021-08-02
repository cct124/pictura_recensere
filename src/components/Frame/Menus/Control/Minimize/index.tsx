import React from "react";
import system from '@/plugin/system';
import './index.scss';
import HorizontalLineSvg from '@/assets/svg/horizontal_line.svg';

/**
 * 最小化窗口
 * @returns 
 */
export default function Minimize() {

  function minimize() {
    system.minimize()
  }

  return (
    <div className="minimize flex-center" onClick={minimize}>
      <HorizontalLineSvg />
    </div>
  );
}
