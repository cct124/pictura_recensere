import { MenubarItem } from '@/types/index.d'

export default function Help(): MenubarItem {

  function openDeveloperTools() {
    console.log('Open Developer Tools');
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