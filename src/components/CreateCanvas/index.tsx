import React, { useState } from "react";
import Input from "@/components/UI/Form/Input";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

export default function CreateCanvas() {
  document.title = '创建画布';

  const [title, setTitle] = useState('新建画布 1');

  const [width, setWidth] = useState(300);

  return (
    <div className={classNames(Style.createCanvas, 'w-100vw', 'h-100vh')}>
      <div className={classNames('flex-center', 'mar-b-10')}>
        <Input className={classNames('w-100p')} value={title} setValue={setTitle} placeholder="标题" />
      </div>
      <div>
        <p className={classNames('mar ft-sm mar-b-5')}>宽度</p>
        <div>
          <Input value={width} setValue={setWidth} className={classNames('w-100p')} placeholder="请输入宽度" type="number" />
        </div>
      </div>
    </div>
  )
}