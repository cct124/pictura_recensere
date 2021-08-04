import { MenubarItem } from '@/types/type.d';

export default function File(): MenubarItem {

  function create() {
    console.log('create');
  }

  function quit() {
    console.log('quit');
  }

  return {
    title: "文件",
    children: [
      {
        title: "新建文件",
        onClick: create
      },
      {
        type: 'separator'
      },
      {
        title: "退出",
        onClick: quit
      }
    ]
  }
}