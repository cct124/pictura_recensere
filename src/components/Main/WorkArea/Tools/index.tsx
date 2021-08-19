import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

import ArrowSvg from "@/assets/svg/arrow.svg";
import TextCursorSvg from "@/assets/svg/text_cursor.svg";

export default function Tools() {

  const toolsConfig = [
    {
      id: 0,
      icon: <ArrowSvg />,
      active: true
    },
    {
      id: 1,
      icon: <TextCursorSvg />,
      active: false
    }
  ]

  const [tools, setTools] = useState(toolsConfig);

  const defaultIndex = toolsConfig.findIndex(tool => tool.active);
  const [currentActiveTool, setCurrentActiveTool] = useState(defaultIndex);

  function onClick(i: number) {
    tools[i].active = true;
    if (currentActiveTool !== null) tools[currentActiveTool].active = false;
    setCurrentActiveTool(i);

    setTools([...tools]);
  }

  return (
    <div className={classNames(Style.tools, 'flex-jcfs-aic flex-column')}>
      {
        tools.map((tool, i) => {
          return (
            <div className={classNames(Style.toolsIcon, Style[`tools-icon-${tool.id}`], 'pointer', tool.active ? Style.toolsIconActive : '',)} key={tool.id} onClick={() => onClick(i)}>
              {tool.icon}
            </div>
          )
        })
      }
    </div>
  )
}