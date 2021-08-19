import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Tools from '@/components/Main/WorkAreaContainer/Tools';
import WorkArea from '@/components/Main/WorkAreaContainer/WorkArea';
import WorkAreaTabs from '@/components/Main/WorkAreaContainer/WorkAreaTabs';

interface WorkAreaType {
  id: number,
  title: string,
  active: boolean,
  component: JSX.Element
}

export default function WorkAreaContainer() {

  const [workAreas, setWorkAreas] = useState<WorkAreaType[]>([])

  return (
    <div className={classNames(Style.WorkAreaContainer, 'flex')}>
      <Tools />
      <div className={classNames(Style.WorkAreas)}>
        <WorkAreaTabs />
        <WorkArea />
      </div>
    </div>
  )
}