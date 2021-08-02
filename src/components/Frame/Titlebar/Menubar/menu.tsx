import React from "react";
import { MenubarItem } from '@/types/index.d'

export default function Menu({ menu }: { menu: () => MenubarItem }) {

  const item = menu();
  console.log(item);

  return <div className="menubar-menu-button">
    <div className="menubar-menu-title">{item.title}</div>
  </div>
}