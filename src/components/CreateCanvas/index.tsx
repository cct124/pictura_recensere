import React, { useState } from "react";
import { Input, Select, Option } from "@/components/UI";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export default function CreateCanvas() {
  document.title = '创建画布';

  const [title, setTitle] = useState('新建画布 1');

  const [width, setWidth] = useState(300);
  const [sizeUnit, setSizeUnit] = useState(1);

  return (
    <div className={classNames(Style.createCanvas, 'w-100vw h-100vh')}>
      <div className={classNames('flex-center mar-b-10')}>
        <Input className={classNames('w-100p')} value={title} setValue={setTitle} placeholder="标题" />
      </div>
      <div>
        <p className={classNames('mar ft-sm mar-b-5')}>宽度</p>
        <div className={classNames('flex-center')}>
          <Input className={classNames('w-100')} value={width} setValue={setWidth} placeholder="请输入宽度" type="number" />
          <Select className={classNames('mar-l-5')} value={sizeUnit} setValue={setSizeUnit}>
            <Option label="黄金糕" value={1} />
            <Option label="双皮奶" value={2} />
            <Option label="蚵仔煎" value={3} />
            <Option label="龙须面" value={4} />
            <Option label="北京烤鸭" value={5} />
          </Select>
        </div>
      </div>
    </div>
  )
}