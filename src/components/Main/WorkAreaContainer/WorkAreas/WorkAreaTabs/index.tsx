import React, { useCallback, useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import { WorkAreaType } from "@/types/type.d";

import CloseSvg from "@/assets/svg/close.svg";

function tabsPath(w: number, h: number, r = 8) {
  return `path('M${r * 2} 0, Q${r} 0 ${r} ${r}, L${r} ${h - r}, Q${r} ${h} 0 ${h}, L${w} ${h}, Q${w - r} ${h} ${w - r} ${h - r}, L${w - r} ${r}, Q${w - r} 0 ${w - r * 2} 0, Z')`
}

/**
 * 工作区选项卡
 * @returns 
 */
export default function WorkAreaTabs({ workAreas, setWorkAreas, tabsStack, setTabsStack }: { tabsStack: Set<number>, setTabsStack: React.Dispatch<React.SetStateAction<Set<number>>>, workAreas: WorkAreaType[], setWorkAreas: React.Dispatch<React.SetStateAction<WorkAreaType[]>> }) {


  const [clipPath, setClipPath] = useState(null);
  const [tabsWdith, setWidth] = useState(0);

  const Ref = useCallback((node: HTMLDivElement) => {
    if (node !== null && clipPath === null) {
      setClipPath(tabsPath(node.clientWidth, node.clientHeight));
      setWidth(node.clientWidth - 16);
    }
  }, []);

  function onClickAreaTabs(id: number) {
    workAreas.forEach(tab => {
      tab.active = tab.id === id
    });

    setWorkAreas([...workAreas]);
    setTabsStackAdd(id);
  }

  function setTabsStackAdd(id: number) {
    if (tabsStack.has(id)) {
      tabsStack.delete(id);
      tabsStack.add(id);
    } else {
      tabsStack.add(id);
    }

    setTabsStack(new Set([...tabsStack]));
  }

  function onCloseWorkArea(id: number) {

    const index = workAreas.findIndex(tab => tab.id === id);
    const self = workAreas[index].active;

    tabsStack.delete(id);
    workAreas.splice(index, 1);

    if (self) {
      if (tabsStack.size < 2 && workAreas[0]) {
        onClickAreaTabs(workAreas[0].id);

      } else {
        const arr = [...tabsStack];
        onClickAreaTabs(arr[arr.length - 1]);
      }
    } else {
      setTabsStack(new Set([...tabsStack]));
      setWorkAreas([...workAreas]);
    }

  }

  return (
    <div className={classNames(Style.workAreaTabs, 'flex relative select-none')}>
      {
        workAreas.map((workArea, i) => (
          <div title={workArea.title} ref={Ref} className={classNames(Style.workArea, workArea.active ? Style.activeWorkArea : "", 'flex-center')} style={{ clipPath: clipPath, left: i * tabsWdith }} key={workArea.id} onClick={() => onClickAreaTabs(workArea.id)}>
            <div className={classNames(Style.title, 'text-center')}>{workArea.title}</div>
            <div className={classNames(Style.closeWorkArea, 'pad-tb-5')} onClick={(e) => { e.stopPropagation(); onCloseWorkArea(workArea.id) }}>
              <CloseSvg />
            </div>
          </div>
        ))
      }
    </div>
  )
}