import React from "react";
import Menu from '@/components/Frame/Titlebar/Menubar/menu';
import file from '@/components/Frame/Titlebar/Menubar/File';

export default function Menubar() {
  return <div className="menubar flex-jcfs-aic"><Menu menu={file} /></div>
}