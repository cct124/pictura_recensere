import React from 'react';
import './index.scss';
import Titlebar from '@/components/Main/Frame/Titlebar'
import WorkAreaContainer from '@/components/Main/WorkAreaContainer'
// import Welcome from '@/components/Main/Welcome'
import APP from '@/config/APP'

/**
 * 主页面组件
 * @returns 
 */
export default function Main() {
  document.title = APP.name;
  return (
    <div className="frame-main">
      <Titlebar />
      <WorkAreaContainer />
    </div>
  )
}