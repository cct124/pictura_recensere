import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Tools from '@/components/Main/WorkAreaContainer/Tools';
import WorkArea from '@/components/Main/WorkAreaContainer/WorkArea';
import WorkAreaTabs from '@/components/Main/WorkAreaContainer/WorkAreaTabs';
import { WorkAreaType } from "@/types/type.d";
/**
 * 工作区容器
 * @returns 
 */
export default function WorkAreaContainer() {

  const [workAreas, setWorkAreas] = useState<WorkAreaType[]>([
    {
      id: 0,
      title: "新建画布 1",
      active: true
    },
    {
      id: 1,
      title: "新建画布 2",
      active: false
    },
    {
      id: 2,
      title: "新建画布 3",
      active: false
    },
    {
      id: 3,
      title: "新建画布 4",
      active: false
    },
  ]);

  const [tabsStack, setTabsStack] = useState(new Set<number>([0]));


  return (
    <div className={classNames(Style.WorkAreaContainer, 'flex')}>
      <Tools />
      <div className={classNames(Style.WorkAreas)}>
        <WorkAreaTabs workAreas={workAreas} setWorkAreas={setWorkAreas} tabsStack={tabsStack} setTabsStack={setTabsStack} />
        {
          workAreas.map(workArea => <WorkArea key={workArea.id} />)
        }
      </div>
    </div>
  )
}