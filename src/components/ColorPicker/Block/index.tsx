import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames, throttler } from '@/utils/tool';
import { toHex, Color } from '@/utils/color';

export default function Block({ basicValue, value, setValue, width, height, className }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>, basicValue: string, height: number, width: number, className?: string }) {

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
  const [, setBlock] = useState<HTMLCanvasElement>(null);
  const [color,] = useState(new Color());

  const pad = 16;
  const evenScore = pad / 2;

  const [offset, setOffset] = useState({
    x: evenScore,
    y: evenScore
  });

  //是否按下鼠标
  const [leftMouseDown, setLeftMouseDown] = useState(false);

  useEffect(() => {
    if (ctx) {
      fillGradient(width, height, basicValue);
      indicator(offset.x, offset.y, getBlockColor(offset.x, offset.y));
      getBlockColor(offset.x, offset.y);
    }
  }, [basicValue, ctx]);

  useEffect(() => {
    if (!ctx) return
    valueColorChange(value);
  }, [value]);

  function valueColorChange(value: string) {
    color.fromString(value);

    if (color.get("saturation") !== undefined &&
      color.get("value") !== undefined) {

      // console.log(Math.round(
      //   width * (color.get("saturation") / 100)
      // ));

      // console.log(Math.round(
      //   height - height * (color.get("value") / 100)
      // ));
      const x = Math.round(
        width * (color.get("saturation") / 100)
      ) + evenScore - 1;
      const y = Math.round(
        height - height * (color.get("value") / 100)
      ) + evenScore + 1;

      fillGradient(width, height, basicValue);
      indicator(x, y, value);

      setOffset({ x, y });

      getBlockColor(x, y);

      // console.log(color.get("saturation"));
      // console.log(color.get("value"));

    }
  }

  // 渲染色块渐变
  function fillGradient(width: number, height: number, color: string) {
    ctx.clearRect(0, 0, width + pad, height + pad)
    ctx.rect(evenScore, evenScore, width, height);

    ctx.fillStyle = color;
    ctx.fillRect(evenScore, evenScore, width, height);

    const grdWhite = ctx.createLinearGradient(evenScore, evenScore, width, 0);
    grdWhite.addColorStop(0, "rgba(255,255,255,1)");
    grdWhite.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grdWhite;
    ctx.fillRect(evenScore, evenScore, width, height);

    const grdBlack = ctx.createLinearGradient(evenScore, evenScore, 0, height + 4);
    grdBlack.addColorStop(0, "rgba(0,0,0,0)");
    grdBlack.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = grdBlack;
    ctx.fillRect(evenScore, evenScore, width, height);
  }

  // 鼠标在色块内移动
  const onMouseMove = throttler((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (leftMouseDown) {
      offsetChange(e);
    }
  }, 10)

  // 鼠标左键被按下
  function onMouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (e.button === 0) {
      setLeftMouseDown(true)
    }
  }

  // 鼠标释放
  function onMouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (e.button === 0) {
      setLeftMouseDown(false)
    }
  }

  function onMouseLeave(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (e.button === 0) {
      setLeftMouseDown(false)
    }
  }

  /**
   * 根据鼠标指针的位置移动指示器
   * @param e 
   */
  function offsetChange(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const y = e.nativeEvent.offsetY < evenScore ? evenScore : e.nativeEvent.offsetY >= (height + evenScore) ? height + evenScore - 1 : e.nativeEvent.offsetY
    const x = e.nativeEvent.offsetX < evenScore ? evenScore : e.nativeEvent.offsetX >= (height + evenScore) ? height + evenScore - 1 : e.nativeEvent.offsetX
    fillGradient(width, height, basicValue);
    setOffset({ x, y });
    indicator(x, y, getBlockColor(x, y));
  }

  function getBlockColor(x: number, y: number) {
    const data = ctx.getImageData(x, y, 1, 1).data;
    const colorValue = toHex({
      r: data[0],
      g: data[1],
      b: data[2],
    });

    setValue(colorValue);

    return colorValue
  }

  /**
   * 鼠标点击色块
   * @param e 
   */
  function onClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    offsetChange(e);
  }

  const ref = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      setBlock(node);
      setCtx(node.getContext('2d'));
    }
  }, []);

  /**
   * 指示器
   * @param y 
   */
  function indicator(x: number, y: number, colorValue: string) {
    color.fromString(colorValue);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color.get('value') < 78 ? '#ffffff' : '#0a0505';
    ctx.arc(x, y, 5, 0, Math.PI * 2); // 绘制
    ctx.stroke();
  }

  return (
    <canvas ref={ref} className={classNames(Style.block, className)} width={width + pad} height={height + pad} onClick={onClick} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} />
  )
}