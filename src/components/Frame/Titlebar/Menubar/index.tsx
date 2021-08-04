import React, { useState, useEffect } from "react";
import Menu from '@/components/Frame/Titlebar/Menubar/menu';
import file from '@/components/Frame/Titlebar/Menubar/File';
import help from '@/components/Frame/Titlebar/Menubar/Help';
import Style from './index.modules.scss';

interface Ev {
  menus?: true
}

export default function Menubar() {

  const menus = [file, help];

  const control = new Map<string, [boolean, React.Dispatch<React.SetStateAction<boolean>>]>();

  function registered(ev: MouseEvent) {
    if (!(ev as Ev).menus) {
      hiddenAll();
    }
  }

  useEffect(() => {
    document.addEventListener("click", registered);
    return () => {
      document.removeEventListener("click", registered);
    }
  })

  /**
   * 关闭所有打开的选项卡 
   */
  function hiddenAll() {
    control.forEach(([view, setView]) => {
      if (view) setView(false)
    })
  }

  /**
   * 当有选项卡打开时移动到标题上打开选项卡
   * @param name 
   * @returns 
   */
  function mouseOver(name: string) {
    for (const [, [view,]] of control) {
      if (view) {
        hiddenAll();
        control.get(name)[1](true)
        return
      }
    }
  }

  function changeChildren([, setView]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]) {
    console.log(setView);
    setView(true);
  }

  const Menus = menus.map(menu => {
    const state = useState(false);
    control.set(menu.name, state);
    return <Menu menu={menu} key={menu.name} changeChildren={changeChildren} mouseOver={mouseOver} state={state} />
  })

  console.log(control);
  
  return <div className={Style['menubar'] + ' flex-jcfs-aic'}>
    {Menus}
  </div>
}