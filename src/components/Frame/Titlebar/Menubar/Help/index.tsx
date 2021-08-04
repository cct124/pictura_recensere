import { MenubarItem } from '@/types/index.d'
import system from '@/plugin/system';

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