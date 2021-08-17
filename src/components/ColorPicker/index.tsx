import React, { useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import Block from "./Block";
import Strip from "./Strip";


export default function ColorPickerWindow() {

  const blockSize = 300;
  const stripSize = {
    width: 50,
    height: 300
  };

  const [blockBasicColor, setClockBasicColor] = useState('');
  const [colorValue, setColorValue] = useState('');
  const [currentColorValue, setCurrentColorValue] = useState('#ffffff');

  return (
    <div className={classNames(Style.ColorPicker, 'flex-jcfs-aic w-100vw h-100vh pad-15 border-box')}>
      <Block className={classNames('mar-r-10')} basicColor={blockBasicColor} value={colorValue} setValue={setColorValue} width={blockSize} height={blockSize} />
      <Strip value={blockBasicColor} setValue={setClockBasicColor} className={classNames(Style.CanvasStrip)} width={stripSize.width} height={stripSize.height} />
      <div className={classNames(Style.Conctrol)}>
        <div className={classNames(Style.ColorCompared)}>
          <p className={classNames('mar mar-b-2 ft-bs pad-l-5')}>新的</p>
          <div className={classNames(Style.ColorBlock, 'mar-b-3')} style={{ backgroundColor: colorValue }}></div>
          <div className={classNames(Style.ColorBlock, 'mar-b-2')} style={{ backgroundColor: currentColorValue }}></div>
          <p className={classNames('mar ft-bs pad-l-5')}>当前</p>
        </div>
      </div>
    </div >
  )
}