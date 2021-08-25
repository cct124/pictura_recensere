import React, { useState, useEffect } from "react";
import Menu from '@/components/Main/Frame/Titlebar/Menubar/menu';
import file from '@/components/Main/Frame/Titlebar/Menubar/File';
import help from '@/components/Main/Frame/Titlebar/Menubar/Help';
import Style from './index.modules.scss';

/**
 * 窗口顶部菜单
 * @returns 
 */
export default function Menubar() {

  const menus = [file, help];

  const menusControl = menus.map((m, i) => ({ name: i, childView: false }));

  const [control, setControl] = useState(menusControl)


  function registered() {
    control.forEach(m => m.childView = false);
    setControl([...control]);
  }

  useEffect(() => {
    document.addEventListener("click", registered);
    return () => {
      document.removeEventListener("click", registered);
    }
  })

  const Menus = menus.map((menu, i) => {
    return <Menu menu={menu} key={i} name={i} control={control} setControl={setControl} />
  })

  return <div className={Style['menubar'] + ' flex-jcfs-aic'}>
    {Menus}
  </div>
}