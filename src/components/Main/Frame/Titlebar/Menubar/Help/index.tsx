import { MenubarItem } from '@/types/type.d'
import system from '@/plugin/system';

/**
 * 帮助菜单
 * @returns 
 */
export default function Help(): MenubarItem {

  function openDeveloperTools() {
    system.openDeveloperTools();
  }

  function Reload() {
    system.reload();
  }

  return {
    title: "帮助",
    children: [
      {
        title: "Reload",
        onClick: Reload
      },
      {
        type: 'separator'
      },
      {
        title: "Developer Tools",
        onClick: openDeveloperTools
      },
    ]
  }
}