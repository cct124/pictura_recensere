import React, { useState } from "react";
import { MenubarItem } from '@/types/index.d'
import menuConctrol from '@/components/Frame/Titlebar/Menubar/MenuConctrol'

export default function Menu({ menu }: { menu: () => MenubarItem }) {

  const [childrenView, setChildrenView] = useState(false);

  menuConctrol.add(setChildrenView);

  const item = menu();

  const Children = (
    <div className="menubar-menu-children">
      {item.children.map((v, i) =>
        v.type === 'separator' ? <span className="menubar-menu-children-separator block" key={i}></span> : <p className="menubar-menu-children-title mar nowrap" key={i} onClick={v.onClick}>{v.title}</p>
      )}
    </div>
  )

  function changeChildrenView() {
    setChildrenView(!childrenView)
  }

  return <div className="menubar-menu-button relative flex-center">
    <div className={childrenView ? 'menubar-menu-title menubar-menu-active' : 'menubar-menu-title'} onClick={changeChildrenView}>{item.title}</div>
    {childrenView ? Children : ""}
  </div>
}