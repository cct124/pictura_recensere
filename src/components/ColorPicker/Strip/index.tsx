import React, { useState, useCallback, useEffect } from "react";
import { classNames, throttler } from '@/utils/tool';
import { toHex, Color } from '@/utils/color';

export default function Strip({ value, setValue, width, height, className }: { setValue: React.Dispatch<React.SetStateAction<string>>, value: string, height: number, width: number, className?: string }) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
  const [, setStrip] = useState<HTMLCanvasElement>(null);
  const [color,] = useState(new Color());

  //是否按下鼠标
  const [leftMouseDown, setLeftMouseDown] = useState(false);

  const pad = 16;
  const evenScore = pad / 2;

  useEffect(() => {
    fillGradient(width, height, height + evenScore - 1)
  }, [ctx]);

  useEffect(() => {
    if (ctx) valueColorChange(value)
  }, [ctx, value]);


  function valueColorChange(value: string) {
    color.fromString(value);

    if (color.get('hue') !== undefined) {
      const y = hueConvertsLength(Math.round(color.get('hue')), height) + evenScore - 1;
      arrowIndicator(y);
      getBlockColor(width / 2, y);
    }
  }

  /**
   * 色相值转换为长度值
   * @param hue 
   * @param length 
   * @returns 
   */
  function hueConvertsLength(hue: number, length: number) {
    return length - Math.round((hue * length) / 360);
  }

  /**
   * 初始化 Strip 色块
   * @param width 
   * @param height 
   * @param arrowInrY 
   * @returns 
   */
  function fillGradient(width: number, height: number, arrowInrY: number) {
    if (!ctx) return
    const clgStrip = ctx.createLinearGradient(evenScore, evenScore + 2, width - pad, height);

    clgStrip.addColorStop(0, "rgba(255, 0, 0, 1)");
    clgStrip.addColorStop(0.17, "rgba(255, 0, 255, 1)");
    clgStrip.addColorStop(0.34, "rgba(0, 0, 255, 1)");
    clgStrip.addColorStop(0.51, "rgba(0, 255, 255, 1)");
    clgStrip.addColorStop(0.68, "rgba(0, 255, 0, 1)");
    clgStrip.addColorStop(0.85, "rgba(255, 255, 0, 1)");
    clgStrip.addColorStop(1, "rgba(255, 0, 0, 1)");
    ctx.fillStyle = clgStrip;
    ctx.fillRect(evenScore, evenScore, width, height);

    arrowIndicator(arrowInrY);
    getBlockColor(width / 2, arrowInrY);
  }

  /**
   * 绘制指示器左右箭头
   * @param y 
   */
  function arrowIndicator(y: number) {
    ctx.clearRect(0, 0, evenScore, height + pad);
    arrow(ctx, evenScore - 1, y, pad);

    ctx.clearRect(width - evenScore, 0, evenScore, height + pad);
    arrow(ctx, width - evenScore + 1, y, pad, 1);
  }

  /**
   * 绘制指示器箭头
   * @param ctx 
   * @param x 
   * @param y 
   * @param size 
   * @param direction  0： 箭头指向右（默认值） 1： 箭头指向左 
   */
  function arrow(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, direction = 0) {

    ctx.beginPath();
    ctx.lineWidth = .6;
    ctx.lineCap = "round";
    ctx.miterLimit = 1;
    ctx.strokeStyle = '#2c2e3a';
    if (direction === 0) {
      ctx.moveTo(x, y);
      ctx.lineTo(x - size / 2, y - size / 4);
      ctx.moveTo(x, y);
      ctx.lineTo(x - size / 2, y + size / 4);
    }

    if (direction === 1) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / 2, y - size / 4);
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / 2, y + size / 4);
    }

    // ctx.closePath();
    ctx.stroke();
  }

  // 获取 canvas node 节点
  const ref = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      setStrip(node);
      setCtx(node.getContext('2d'));
    }
  }, []);

  // 鼠标在色块内移动
  const onMouseMove = throttler((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    if (leftMouseDown) {
      offsetYChange(e);
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

  //鼠标移到色块外部
  function onMouseLeave(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (e.button === 0) {
      setLeftMouseDown(false)
    }
  }

  /**
   * 鼠标点击色块
   * @param e 
   */
  function onClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    offsetYChange(e);
  }

  /**
   * 根据鼠标指针的位置移动指示器
   * @param e 
   */
  function offsetYChange(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const Y = e.nativeEvent.offsetY < evenScore ? evenScore : e.nativeEvent.offsetY >= (height + evenScore) ? height + evenScore - 1 : e.nativeEvent.offsetY
    arrowIndicator(Y);
    getBlockColor(width / 2, Y);
  }

  /**
   * 根据鼠标指针的位置获取当前的色值
   * @param x 
   * @param y 
   */
  function getBlockColor(x: number, y: number) {
    const data = ctx.getImageData(x, y, 1, 1).data;
    setValue(toHex({
      r: data[0],
      g: data[1],
      b: data[2],
    }))
  }

  return (
    <canvas ref={ref} className={classNames(className)} width={width} height={height + pad} onClick={onClick} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} />
  )
}