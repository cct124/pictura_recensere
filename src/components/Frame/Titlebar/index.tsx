import React from 'react';
import Style from './index.modules.scss';

import PicturaRecensereLogo from '@/assets/svg/pictura_recensere_logo.svg';

import Minimize from '@/components/Frame/Titlebar/Control/Minimize';
import Maximize from '@/components/Frame/Titlebar/Control/Maximize';
import Close from '@/components/Frame/Titlebar/Control/Close';
import Menubar from '@/components/Frame/Titlebar/Menubar';

export default function Titlebar() {
  return <div className={Style['frame-titlebar'] + " flex-jcsb-aic"}>
    <div className={Style['left']}><div className={Style['logo'] + " pad-5"}><PicturaRecensereLogo /></div></div>
    <div className={Style['middle'] + ' grow'}>
      <Menubar />
    </div>
    <div className={Style['right'] + ' flex'}>
      <Minimize />
      <Maximize />
      <Close />
    </div>
  </div>
}