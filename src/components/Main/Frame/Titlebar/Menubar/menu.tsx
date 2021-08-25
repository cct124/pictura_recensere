import React from "react";
import { MenubarItem } from '@/types/type.d'
import Style from './index.modules.scss';
import { classNames } from '@/utils/tool';

export let closeAllMenusChild: () => void

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
    ev.stopPropagation();
    targer.childView = !targer.childView;
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

  closeAllMenusChild = () => {
    control.forEach(m => {
      m.childView = false
    });
    setControl([...control])
  }

  return <div className={classNames(Style['menubar-menu-button'], 'relative flex-center')}>
    <div className={classNames(childView ? classNames(Style['menubar-menu-title'], Style['menubar-menu-active']) : Style['menubar-menu-title'])} onClick={onClick} onMouseOver={onMouseOver}>{item.title}</div>
    {childView ? Children : ""}
  </div>
}