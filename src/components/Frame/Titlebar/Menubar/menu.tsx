import React from "react";
import { MenubarItem } from '@/types/index.d'
import { Ev } from './index'
import Style from './index.modules.scss';

export default function Menu({ menu, name, control, setControl }: {
  menu: () => MenubarItem,
  name: number,
  control: {
    name: number;
    childView: boolean;
  }[],
  setControl: React.Dispatch<React.SetStateAction<{
    name: number;
    childView: boolean;
  }[]>>
}) {

  const targer = control.find(m => m.name === name);

  const childView = targer.childView;
  const item = menu();

  const Children = (
    <div className={Style['menubar-menu-children']}>
      {item.children.map((v, i) =>
        v.type === 'separator' ? <span className={Style['menubar-menu-children-separator'] + ' block'} key={i}></span> : <p className={Style['menubar-menu-children-title'] + ' mar nowrap'} key={i} onClick={v.onClick}>{v.title}</p>
      )}
    </div>
  )

  function onClick(ev: React.MouseEvent) {
    (ev.nativeEvent as Ev).menus = true
    targer.childView = !targer.childView
    console.log(control);

    setControl([...control]);
  }

  function onMouseOver() {
    const active = control.find(m => m.childView);

    if (active && active.name !== name) {
      control.forEach(m => {
        m.childView = m.name === name
      });

      setControl([...control])
    }

  }

  return <div className={Style['menubar-menu-button'] + ' relative flex-center'}>
    <div className={childView ? (Style['menubar-menu-title'] + ' ' + Style['menubar-menu-active']) : Style['menubar-menu-title']} onClick={onClick} onMouseOver={onMouseOver}>{item.title}</div>
    {childView ? Children : ""}
  </div>
}