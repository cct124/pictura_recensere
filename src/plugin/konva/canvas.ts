import { genArr, loadImg, paramMixin, RunTime } from "@/utils/tool";
import Konva from "konva";
import { LayerConfig } from "konva/lib/Layer";
import Observer from "../observer";
import symbol from "../symbol";

export enum EventType {
  createCanvas = "create-canvas",
}

export type Event = {
  type: EventType;
  targer: Konva.Group;
  sender: Canvas;
};

export default class Canvas extends Observer<EventType, Event> {
  group: Konva.Group;
  id: string;

  constructor({
    id,
    width,
    height,
    x,
    y,
  }: {
    id: string;
    /**
     * Canvas 的宽度
     */
    width: number;
    /**
     * Canvas 的高度
     */
    height: number;
    x: number;
    y: number;
  }) {
    super();
    this.id = id;
    this.group = new Konva.Group({
      width,
      height,
      x,
      y,
      clip: {
        width,
        height,
        x: 0,
        y: 0,
      },
    });
    this.group.offsetX(width / 2);
    this.group.offsetY(height / 2);
    this.alternatingRectangleMatrix(width, height).then((image) => {
      this.group.add(image);
    });
  }

  /**
   * 创建两种颜色交替平铺的矩阵
   * *通常用来作为显示透明背景*
   * @param width
   * @param height
   * @param size 每个矩形的大小
   * @param color1 颜色1
   * @param color2 颜色2
   * @returns
   */
  alternatingRectangleMatrix(
    width: number,
    height: number,
    size: number = 10,
    color1: string = "#ffffff",
    color2: string = "#cccccc"
  ) {
    return new Promise<Konva.Group>(async (resolve, reject) => {
      try {
        const ws = genArr(width / size);
        const hs = genArr(height / size - 1);
        const tbg = new Konva.Group();
        const rowtbg = new Konva.Group();
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

        const rectImg1 = document.createElement("img");
        const rectImg2 = document.createElement("img");
        rectImg1.src = rect1.toDataURL();
        rectImg2.src = rect2.toDataURL();

        rect1.destroy();
        rect2.destroy();

        const kri1 = new Konva.Image({
          image: rectImg1,
        });
        const kri2 = new Konva.Image({
          image: rectImg2,
        });

        for (const wx of ws) {
          const kri = wx % 2 ? kri1 : kri2;
          kri.x(wx * size);
          kri.y(0);

          rowtbg.add(kri.clone());
        }

        rowtbg.width(300);
        rowtbg.height(10);
        rowtbg.cache();
        // console.log(rowtbg);

        const rowImg = await loadImg(rowtbg.toDataURL());
        const row = new Konva.Image({
          image: rowImg,
        });

        for (const hy of hs) {
          const trow = row.clone();
          trow.x(hy % 2 ? -size : 0);
          trow.y(hy * size);
          tbg.add(trow);
        }
        resolve(tbg);
      } catch (error) {
        reject(error);
      }
    });
  }
}
