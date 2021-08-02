import React from 'react';
import './index.scss';

import PicturaRecensereLogo from '@/assets/svg/pictura_recensere_logo.svg';

import Minimize from '@/components/Frame/Titlebar/Control/Minimize';
import Maximize from '@/components/Frame/Titlebar/Control/Maximize';
import Close from '@/components/Frame/Titlebar/Control/Close';

export default function Titlebar() {
  return <div className="frame-menus flex-jcsb-aic">
    <div className="left"><div className="logo pad-5"><PicturaRecensereLogo /></div></div>
    <div className="middle grow">
      
    </div>
    <div className="right flex">
      <Minimize />
      <Maximize />
      <Close />
    </div>
  </div>
}