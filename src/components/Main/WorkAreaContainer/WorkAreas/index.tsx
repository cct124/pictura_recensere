import React from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import { WorkAreaType } from "@/types/type.d";

import Tools from '@/components/Main/WorkAreaContainer/WorkAreas/Tools';
import WorkArea from '@/components/Main/WorkAreaContainer/WorkAreas/WorkArea';
import WorkAreaTabs from '@/components/Main/WorkAreaContainer/WorkAreas/WorkAreaTabs';

/**
 * 工作区列表
 * @param param0 
 * @returns 
 */
export default function WorkAreas({ workAreas, setWorkAreas, tabsStack, setTabsStack }: { tabsStack: Set<number>, setTabsStack: React.Dispatch<React.SetStateAction<Set<number>>>, workAreas: WorkAreaType[], setWorkAreas: React.Dispatch<React.SetStateAction<WorkAreaType[]>> }) {

  return (
    <div className={classNames(Style.workAreas, 'flex wh100p')}>
      <Tools />
      <div className={classNames(Style.WorkAreaTabs)}>
        <WorkAreaTabs workAreas={workAreas} setWorkAreas={setWorkAreas} tabsStack={tabsStack} setTabsStack={setTabsStack} />
        {
          workAreas.map((workArea) => <WorkArea workArea={workArea} key={workArea.id} />)
        }
      </div>
    </div>
  )
}