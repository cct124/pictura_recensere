import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import { WorkAreaType, CreateCanvasInfo } from "@/types/type.d";


import WorkAreas from "@/components/Main/WorkAreaContainer/WorkAreas";
import Welcome from "@/components/Main/WorkAreaContainer/Welcome";

export let createCanvas: (data: CreateCanvasInfo) => void

/**
 * 工作区容器
 * @returns 
 */
export default function WorkAreaContainer() {

  const [workAreas, setWorkAreas] = useState<WorkAreaType[]>([
    {
      id: 0,
      title: "新建画布 1",
      active: true,
      color: "#ffffff",
      height: 300,
      unit: "px",
      width: 300,
    }
  ]);

  const [tabsStack, setTabsStack] = useState(new Set<number>([0]));

  createCanvas = (data) => {

    const id = workAreas.length;

    workAreas.forEach(workArea => workArea.active = false);

    workAreas.push({
      id,
      active: true,
      ...data
    });

    tabsStack.add(id);
    setTabsStack(new Set([...tabsStack]));

    setWorkAreas([...workAreas])
  }

  return (
    <div className={classNames(Style.workAreaContainer, 'flex')}>
      {
        workAreas.length === 0 ? <Welcome /> :
          <WorkAreas workAreas={workAreas} setWorkAreas={setWorkAreas} tabsStack={tabsStack} setTabsStack={setTabsStack} />
      }
    </div>
  )
}