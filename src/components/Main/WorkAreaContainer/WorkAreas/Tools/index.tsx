import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

import ToolsConctrol from '@/plugin/canvas/toolsConctrol';

import { ColorPicker } from "@/components/UI";


/**
 * 侧边工具栏
 * @returns 
 */
export default function Tools({ toolsConctrol }: { toolsConctrol: ToolsConctrol }) {

  const [tools, setTools] = useState([...toolsConctrol.tools]);

  function onClick(id: number) {
    toolsConctrol.active(id);
    setTools([...toolsConctrol.tools]);
  }

  const [color, setColor] = useState('#ffffff');


  return (
    <div className={classNames(Style.tools, 'flex-jcfs-aic flex-column')}>
      {
        tools.map(tool => {
          return (
            <div className={classNames(Style.toolsIcon, Style[`tools-icon-${tool.id}`], 'pointer', tool.active ? Style.toolsIconActive : '',)} key={tool.id} onClick={() => onClick(tool.id)}>
              {tool.icon}
            </div>
          )
        })
      }
      <ColorPicker value={color} setValue={setColor} />
    </div>
  )
}