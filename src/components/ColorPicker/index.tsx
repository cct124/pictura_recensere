import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Block from "./Block";
import Strip from "./Strip";
import { Input, Button } from "@/components/UI";


export default function ColorPickerWindow() {

  const blockSize = 300;
  const stripSize = {
    width: 50,
    height: 300
  };

  const [blockColor, setBlockColor] = useState('#ffffff');
  const [stripColor, setStripColor] = useState('#ffffff');
  const [inputColor, setInputColor] = useState('#ffffff');
  const [currentColor,] = useState('#ffffff');

  return (
    <div className={classNames(Style.ColorPicker, 'flex-jcfs-aic w-100vw h-100vh pad-15 border-box select-none')}>
      <Block className={classNames('mar-r-10')} basicValue={stripColor} value={inputColor} setValue={setBlockColor} width={blockSize} height={blockSize} />
      <Strip className={classNames(Style.CanvasStrip, 'mar-r-5')} value={inputColor} setValue={setStripColor} width={stripSize.width} height={stripSize.height} />
      <div className={classNames(Style.Conctrol, 'flex-jcsb-aifs flex-column grow')}>
        <div className={classNames(Style.ColorInput, 'mar-t-20')}>
          <div className={classNames(Style.ColorCompared, 'mar-b-10')}>
            <p className={classNames('mar mar-b-2 ft-bs pad-l-5')}>新的</p>
            <div className={classNames(Style.ColorBlock, 'mar-b-5')} style={{ backgroundColor: blockColor }}></div>
            <div className={classNames(Style.ColorBlock, 'mar-b-5')} style={{ backgroundColor: currentColor }}></div>
            <p className={classNames('mar ft-bs pad-l-5')}>当前</p>
          </div>
          <Input className={classNames('w-100')} value={blockColor} setValue={setInputColor} />
        </div>
        <div className={classNames('w-100p text-right border-box pad-r-10')}>
          <Button type="primary">确定</Button>
        </div>
      </div>
    </div >
  )
}