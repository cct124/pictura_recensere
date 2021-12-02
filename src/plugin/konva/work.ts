import { genArr, loadImg, paramMixin, RunTime } from "@/utils/tool";
import Konva from "konva";
import Canvas from "./canvas";
import { LayerConfig } from "konva/lib/Layer";
import Observer from "../observer";
import symbol from "../symbol";
import { KonvaEventObject } from "konva/lib/Node";

const time = new RunTime();

export interface CreateCanvasConfig extends LayerConfig {
  width: number;
  height: number;
  id: string;
  name?: string;
  x: number;
  y: number;

  //设置节点中心
  offsetCenter?: boolean;
}

export enum EventType {
  /**
   * 初始化完成
   */
  init = "init",
  /**
   * 添加画布
   */
  add = "add",
}

export type Event = {
  type: EventType;
  targer: unknown;
  sender: Work;
};

export default class Work extends Observer<EventType, Event> {
  /**
   * Konva Stage
   */
  stage: Konva.Stage;

  width: number;
  height: number;

  canvas = new Set<Canvas>();
  /**
   * 舞台缩放值
   */
  scale = 1;
  /**
   * 舞台缩系数
   */
  scaleCoe: number;
  layer: Konva.Layer;
  backgroundColor: string;
  background: Konva.Rect;

  constructor({
    container,
    width,
    height,
    tabIndex,
    scaleCoe = 0.2,
    backgroundColor = "#e4e4e4",
  }: {
    /**
     * Canvas 容器
     */
    container: string | HTMLDivElement;
    /**
     * Canvas 的宽度
     */
    width: number;
    /**
     * Canvas 的高度
     */
    height: number;
    tabIndex: number;
    /**
     * 缩放系数
     */
    scaleCoe?: number;
    /**
     * 工作区背景颜色
     */
    backgroundColor?: string;
  }) {
    super();
    this.scaleCoe = scaleCoe;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.stage = new Konva.Stage({
      container,
      width: this.width,
      height: this.height,
    });
    this.layer = new Konva.Layer({
      width: this.width,
      height: this.height,
    });
    this.stage.add(this.layer);
    this.stage.container().tabIndex = tabIndex;
    this.background = new Konva.Rect({
      width,
      height,
      fill: this.backgroundColor,
    });
    this.layer.add(this.background);

    // 初始化完毕
    this.send(EventType.init, {
      type: EventType.init,
      targer: this.stage,
      sender: this,
    });
  }

  /**
   * 传入`id`返回画布对象
   * @param id
   * @returns
   */
  find(id: string) {
    for (let canvas of this.canvas.values()) {
      if (canvas.id === id) return canvas;
    }
  }

  /**
   * 添加画布到工作区
   * @param canvas
   */
  add(canvas: Canvas) {
    this.canvas.add(canvas);
    this.layer.add(canvas.group);
    this.send(EventType.add, {
      type: EventType.add,
      targer: canvas,
      sender: this,
    });
  }

  /**
   * 删除某`id`在工作区中的画布
   * @param id
   * @returns
   */
  del(id: string) {
    const target = this.find(id);
    if (target) return this.canvas.delete(target);
    return false;
  }

  mousewheelScale(ev: KonvaEventObject<WheelEvent>) {
    console.log(ev);

    // this.offset(ev.evt.offsetX, ev.evt.offsetY);
    // this.setScale(2);

    if (ev.evt.deltaY < 0) {
      const scale = this.scale + this.scaleCoe;
      this.setScale(scale);
      const x = ev.evt.offsetX * scale - ev.evt.offsetX;
      const y = ev.evt.offsetY * scale - ev.evt.offsetY;
      console.log(ev.evt.offsetX, x, y, ev.evt.offsetY);

      this.offset(x, y);
    } else {
      const scale = this.scale - this.scaleCoe;
      this.setScale(scale);
      const x = ev.evt.offsetX * scale - ev.evt.offsetX;
      const y = ev.evt.offsetY * scale - ev.evt.offsetY;
      this.offset(x, y);
    }
  }

  setScale(value: number) {
    this.layer.scaleX(value);
    this.layer.scaleY(value);
    this.scale = value;
    return value;
  }

  offset(x: number, y: number) {
    this.layer.offsetX(x);
    this.layer.offsetY(y);
  }
}
