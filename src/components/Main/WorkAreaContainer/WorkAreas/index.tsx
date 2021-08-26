import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import { WorkAreaType } from "@/types/type.d";

import ToolsConctrol from '@/plugin/canvas/toolsConctrol';

import ArrowSvg from "@/assets/svg/arrow.svg";
import TextCursorSvg from "@/assets/svg/text_cursor.svg";
import RectSvg from "@/assets/svg/rect.svg";

import Tools from '@/components/Main/WorkAreaContainer/WorkAreas/Tools';
import WorkArea from '@/components/Main/WorkAreaContainer/WorkAreas/WorkArea';
import WorkAreaTabs from '@/components/Main/WorkAreaContainer/WorkAreas/WorkAreaTabs';
import { InteractiveType } from "@/plugin/canvas/interactiveConctrol";


/**
 * 工作区列表
 * @param param0 
 * @returns 
 */
export default function WorkAreas({ workAreas, setWorkAreas, tabsStack, setTabsStack }: { tabsStack: Set<number>, setTabsStack: React.Dispatch<React.SetStateAction<Set<number>>>, workAreas: WorkAreaType[], setWorkAreas: React.Dispatch<React.SetStateAction<WorkAreaType[]>> }) {

  const toolsConctrol = new ToolsConctrol([
    {
      id: 0,
      icon: <ArrowSvg />,
      active: true,
      type: InteractiveType.pointer
    },
    {
      id: 1,
      icon: <TextCursorSvg />,
      active: false,
      type: InteractiveType.text
    },
    {
      id: 2,
      icon: <RectSvg />,
      active: false,
      type: InteractiveType.rect
    }
  ]);

  return (
    <div className={classNames(Style.workAreas, 'flex wh100p')}>
      <Tools toolsConctrol={toolsConctrol} />
      <div className={classNames(Style.WorkAreaTabs)}>
        <WorkAreaTabs workAreas={workAreas} setWorkAreas={setWorkAreas} tabsStack={tabsStack} setTabsStack={setTabsStack} />
        {
          workAreas.map((workArea) => <WorkArea toolsConctrol={toolsConctrol} workArea={workArea} key={workArea.id} />)
        }
      </div>
    </div>
  )
}