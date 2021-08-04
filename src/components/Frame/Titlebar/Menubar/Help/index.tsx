import { MenubarItem } from '@/types/index.d'
import system from '@/plugin/system';

export default function Help(): MenubarItem {

  function openDeveloperTools() {
    system.openDeveloperTools();
  }

  return {
    title: "帮助",
    children: [
      {
        title: "Developer Tools",
        onClick: openDeveloperTools
      },
    ]
  }
}