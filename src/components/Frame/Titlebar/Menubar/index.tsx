import React, { useState, useEffect } from "react";
import Menu from '@/components/Frame/Titlebar/Menubar/menu';
import file from '@/components/Frame/Titlebar/Menubar/File';
import help from '@/components/Frame/Titlebar/Menubar/Help';
import Style from './index.modules.scss';

export interface Ev {
  menus?: true
}

export default function Menubar() {

  const menus = [file, help];

  const menusControl = menus.map((m, i) => ({ name: i, childView: false }));

  const [control, setControl] = useState(menusControl)


  function registered(ev: MouseEvent) {
    if (!(ev as Ev).menus) {
      control.forEach(m => m.childView = false);
      setControl([...control]);
    }
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