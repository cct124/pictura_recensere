import React from 'react';
import './index.scss';
import Titlebar from '@/components/Main/Frame/Titlebar'
import APP from '@/config/APP'

export default function Main() {
  document.title = APP.name;
  return (
    <div className="frame-main">
      <Titlebar />
    </div>
  )
}