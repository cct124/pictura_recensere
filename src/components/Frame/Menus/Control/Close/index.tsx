import React from "react";
import system from '@/plugin/system';
import CloseSvg from '@/assets/svg/close.svg';
import './index.scss';

/**
 * 关闭窗口
 * @returns 
 */
export default function Close() {
  function close() {
    system.close()
  }

  return <div className="close flex-center" onClick={close}><CloseSvg /></div>

}