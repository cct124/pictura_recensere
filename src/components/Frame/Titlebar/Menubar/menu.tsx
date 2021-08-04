import React from "react";
import { MenubarItem } from '@/types/index.d'
import Style from './index.modules.scss';

export default function Menu({ menu, state, mouseOver, changeChildren }: { menu: () => MenubarItem, mouseOver: (name: string) => void, changeChildren: (state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]) => void, state: [boolean, React.Dispatch<React.SetStateAction<boolean>>] }) {

  const [childrenView] = state;

  const item = menu();

  const Children = (
    <div className={Style['menubar-menu-children']}>
      {item.children.map((v, i) =>
        v.type === 'separator' ? <span className={Style['menubar-menu-children-separator'] + ' block'} key={i}></span> : <p className={Style['menubar-menu-children-title'] + ' mar nowrap'} key={i} onClick={v.onClick}>{v.title}</p>
      )}
    </div>
  )

  function changeChildrenView() {
    console.log('click');
    changeChildren(state)
  }

  function onMouseOver() {
    console.log('onMouseOver');
    mouseOver(menu.name)
  }

  return <div className={Style['menubar-menu-button'] + ' relative flex-center'}>
    <div className={childrenView ? (Style['menubar-menu-title'] + ' ' + Style['menubar-menu-active']) : Style['menubar-menu-title']} onClick={changeChildrenView} onMouseOver={onMouseOver}>{item.title}</div>
    {childrenView ? Children : ""}
  </div>
}