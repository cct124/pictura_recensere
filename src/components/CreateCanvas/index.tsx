import React, { useState } from "react";
import { Input, Select, Option } from "@/components/UI";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * 创建画布窗口组件
 * @returns 
 */
export default function CreateCanvas() {

  const [title, setTitle] = useState('新建画布 1');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [sizeUnit, setSizeUnit] = useState('px');

  return (
    <div className={classNames(Style.createCanvasBody, 'w-100vw h-100vh')}>
      <div className={classNames(Style.createCanvas, 'w-100p h-100p')}>
        <div className={classNames(Style.frame)}></div>
        <div className={classNames(Style.container, 'h-100p')}>
          <div className={classNames('flex-center mar-b-20')}>
            <Input className={classNames('w-100p')} value={title} setValue={setTitle} placeholder="标题" />
          </div>
          <div className={classNames(Style.width, 'mar-b-20')}>
            <p className={classNames('mar ft-sm mar-b-5')}>宽度</p>
            <div className={classNames('flex-center')}>
              <Input className={classNames('w-100')} value={width} setValue={setWidth} placeholder="请输入宽度" type="number" />
              <Select className={classNames('mar-l-5')} value={sizeUnit} setValue={setSizeUnit}>
                <Option label="像素" value={'px'} />
              </Select>
            </div>
          </div>
          <div className={classNames(Style.height)}>
            <p className={classNames('mar ft-sm mar-b-5')}>高度</p>
            <Input className={classNames('w-100')} value={height} setValue={setHeight} placeholder="请输入宽度" type="number" />
          </div>
        </div>
      </div>
    </div>
  )
}