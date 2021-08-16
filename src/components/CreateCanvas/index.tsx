import React, { useState } from "react";
import { Input, Select, Option, Button, ColorPicker } from "@/components/UI";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import createCanvas from '@/plugin/createCanvas';

import CloseSvg from '@/assets/svg/close.svg';

/**
 * 创建画布窗口组件
 * @returns 
 */
export default function CreateCanvas() {

  const [title, setTitle] = useState('新建画布 1');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [sizeUnit, setSizeUnit] = useState('px');
  const [color, setColor] = useState('#ffffff');

  function onClick() {
    createCanvas.close();
  }

  function onClickHandle() {
    createCanvas.forwardCreateCanvasInfo({ title, width, height, sizeUnit });
  }

  return (
    <div className={classNames(Style.createCanvasBody, 'w-100vw h-100vh')}>
      <div className={classNames(Style.createCanvas, 'w-100p h-100p')}>
        <div className={classNames(Style.frame, 'flex-jcsb-aic')}>
          <div className={classNames('ft-bs')}>创建画布</div>
          <div className={classNames(Style.frameClose, 'tsn-dark-svg')} onClick={onClick}><CloseSvg /></div>
        </div>
        <div className={classNames(Style.container)}>
          <div className={classNames('flex-center mar-b-15')}>
            <Input className={classNames('w-100p')} value={title} setValue={setTitle} placeholder="标题" />
          </div>
          <div className={classNames(Style.width, 'mar-b-15')}>
            <p className={classNames('mar ft-sm mar-b-5')}>宽度</p>
            <div className={classNames('flex-center')}>
              <Input className={classNames('w-100')} value={width} setValue={setWidth} placeholder="请输入宽度" type="number" />
              <Select className={classNames('mar-l-5')} value={sizeUnit} setValue={setSizeUnit}>
                <Option label="像素" value={'px'} />
                <Option label="毫米" value={'mm'} />
              </Select>
            </div>
          </div>
          <div className={classNames(Style.height, 'mar-b-15')}>
            <p className={classNames('mar ft-sm mar-b-5')}>高度</p>
            <Input className={classNames('w-100')} value={height} setValue={setHeight} placeholder="请输入宽度" type="number" />
          </div>
          <div className={classNames(Style.color, 'mar-b-30')}>
            <p className={classNames('mar ft-sm mar-b-5')}>背景色</p>
            <div className={classNames('flex-jcsb-aic')}>
              <Select className={classNames(Style.select)} value={color} setValue={setColor}>
                <Option label="白色" value={'#ffffff'} />
                <Option label="黑色" value={'#000000'} />
              </Select>
              <ColorPicker />
            </div>
          </div>
          <div className={classNames('flex-jcfe-aic')}>
            <Button className={classNames('w-100')} type="primary" onClick={onClickHandle}>
              确定
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}