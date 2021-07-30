import React, { useState } from 'react';
import './index.scss';
import system from '@/plugin/system';

import PicturaRecensereLogo from '@/assets/svg/pictura_recensere_logo.svg';
import HorizontalLine from '@/assets/svg/horizontal_line.svg';
import MaximizeNormal from '@/assets/svg/maximize_normal.svg';
import Maximize from '@/assets/svg/maximize.svg';
import Close from '@/assets/svg/close.svg';

export let setIsMaximizes: React.Dispatch<React.SetStateAction<boolean>>;

export default function Menus() {
  const [isMaximize, setIsMaximize] = useState(false);
  setIsMaximizes = setIsMaximize
  function minimize() {
    system.minimize()
  }

  function maximize() {
    isMaximize ? system.unmaximize() : system.maximize()
  }

  return <div className="frame-menus flex-jcsb-aic">
    <div className="left"><div className="logo pad-5"><PicturaRecensereLogo /></div></div>
    <div className="middle grow"></div>
    <div className="right flex">
      <div className="minimize flex-center" onClick={minimize}><HorizontalLine /></div>
      <div className="maximize flex-center" onClick={maximize}>{isMaximize ? <Maximize /> : <MaximizeNormal />}</div>
      <div className="close flex-center"><Close /></div>
    </div>
  </div>
}