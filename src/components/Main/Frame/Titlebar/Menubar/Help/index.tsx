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

  function openAboutMessageBox() {
    system.openAboutMessageBox()
  }
  
  return {
    title: "帮助",
    children: [
      {
        title: "刷新",
        onClick: Reload
      },
      {
        type: 'separator'
      },
      {
        title: "开发人员工具",
        onClick: openDeveloperTools
      },
      {
        type: 'separator'
      },
      {
        title: "关于",
        onClick: openAboutMessageBox
      },
    ]
  }
}