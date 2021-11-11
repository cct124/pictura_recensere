import { genArr, paramMixin, RunTime } from "@/utils/tool";
import Konva from "konva";
import { LayerConfig } from "konva/lib/Layer";
import Observer from "../observer";

const time = new RunTime();

export interface CreateCanvasConfig extends LayerConfig {
  width: number;
  height: number;
  id: string;
  name?: string;
  x: number;
  y: number;
  offsetCenter?: boolean;
}

export enum EventType {
  createCanvas = "create-canvas",
}

export type Event = {
  type: EventType;
  targer: Konva.Layer;
  sender: Canvas;
};

export default class Canvas extends Observer<EventType, Event> {
  /**
   * Konva Stage
   */
  statg: Konva.Stage;

  layers: Konva.Layer[] = [];

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
    this.statg = new Konva.Stage({
      container,
      width,
      height,
    });
  }

  /**
   * 创建画布
   * @param param.width 画布的宽度
   * @param param.height 画布的高度
   * @param param.id 画布的id
   * @param param.x 画布x位置
   * @param param.y 画布y位置
   * @param param.offsetCenter 为 `true` 时画布x, y偏移量为画布中心
   */
  createCanvas(cfg: CreateCanvasConfig) {
    const [native, config] = paramMixin(
      {
        name: "canvas-layer",
      },
      cfg,
      {
        offsetCenter: true,
      }
    );

    const layer = new Konva.Layer(native);
    if (config.offsetCenter) {
      layer.offsetX(config.width / 2);
      layer.offsetY(config.height / 2);
    }
    this.statg.add(layer);
    this.layers.push(layer);
    time.start(1);
    const tgb = this.createTransparentBackground(config.width, config.height);
    layer.add(tgb);
    time.end(1);
    this.send(EventType.createCanvas, {
      type: EventType.createCanvas,
      targer: layer,
      sender: this,
    });
  }

  createTransparentBackground(
    width: number,
    height: number,
    size: number = 10,
    color1: string = "#ffffff",
    color2: string = "#cccccc"
  ) {
    const ws = genArr(width / size - 1);
    const hs = genArr(height / size - 1);
    const tbg = new Konva.Group({
      name: "transparent-background",
    });
    const rect1 = new Konva.Rect({
      width: size,
      height: size,
      fill: color1,
    });
    const rect2 = new Konva.Rect({
      width: size,
      height: size,
      fill: color2,
    });
    rect1.cache();
    rect2.cache();

    for (const hy of hs) {
      for (const wx of ws) {
        const rect = hy % 2 ? (wx % 2 ? rect1 : rect2) : wx % 2 ? rect2 : rect1;
        const x = wx * size;
        const y = hy * size;
        rect.x(x);
        rect.y(y);
        tbg.add(rect.clone());
      }
    }
    return tbg;
  }
}
