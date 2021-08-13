import { MenubarItem } from '@/types/type.d';
import system from '@/plugin/system';

/**
 * 文件菜单
 * @returns 
 */
export default function File(): MenubarItem {

  function create() {
    system.createCanvas()
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