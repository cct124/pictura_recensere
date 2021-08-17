import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames, throttler } from '@/utils/tool';
import { toHex } from '@/utils/color';

export default function Block({ basicColor, value, setValue, width, height, className }: { basicColor: string, setValue: React.Dispatch<React.SetStateAction<string>>, value: string, height: number, width: number, className?: string }) {

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
  const [block, setBlock] = useState<HTMLCanvasElement>(null);
  
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
      fillGradient(width, height, basicColor);
      indicator(offset.x, offset.y);
      getBlockColor(offset.x, offset.y);
    }

  }, [basicColor, ctx]);

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

    const grdBlack = ctx.createLinearGradient(evenScore, evenScore, 0, height);
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
    fillGradient(width, height, basicColor);
    indicator(x, y);
    getBlockColor(x, y);
    setOffset({ x, y });
  }

  function getBlockColor(x: number, y: number) {
    const data = ctx.getImageData(x, y, 1, 1).data;

    setValue(toHex({
      r: data[0],
      g: data[1],
      b: data[2],
    }))

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
  function indicator(x: number, y: number) {
    ctx.beginPath();
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = '#2c2e3a';
    ctx.arc(x, y, 5, 0, Math.PI * 2); // 绘制
    ctx.stroke();
  }

  return (
    <canvas ref={ref} className={classNames(Style.block, className)} width={width + pad} height={height + pad} onClick={onClick} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} />
  )
}