import React from "react";
import system from '@/plugin/system';
import HorizontalLineSvg from '@/assets/svg/horizontal_line.svg';
import Style from '../index.modules.scss';

/**
 * 最小化窗口
 * @returns 
 */
export default function Minimize() {

  function minimize() {
    system.minimize()
  }

  return (
    <div className={Style['minimize'] + ' flex-center'} onClick={minimize}>
      <HorizontalLineSvg />
    </div>
  );
}
