import { genArr, loadImg, paramMixin, RunTime } from "@/utils/tool";
import Konva from "konva";
import Canvas from "./canvas";
import { LayerConfig } from "konva/lib/Layer";
import Observer from "../observer";
import symbol from "../symbol";

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
  statg: Konva.Stage;

  width: number;
  height: number;

  canvas = new Set<Canvas>();

  constructor({
    container,
    width,
    height,
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
  }) {
    super();
    this.width = width;
    this.height = height;
    this.statg = new Konva.Stage({
      container,
      width: this.width,
      height: this.height,
    });
    // 初始化完毕
    this.send(EventType.init, {
      type: EventType.init,
      targer: this.statg,
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
    this.statg.add(canvas.layer);
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
}
