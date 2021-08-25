import Observer from "@/plugin/observer";

export type Matrix = [number, number, number, number, number, number];

export type RenderStackEvent = {
  type: string;
  targer: unknown;
};

export enum RenderStackEventName {
  change = "change",
}

export default class RenderStack extends Observer<
  RenderStackEventName,
  RenderStackEvent
> {
  protected matrixOrigin: Matrix = [1, 0, 0, 1, 0, 0];

  protected ctx: CanvasRenderingContext2D;

  /**
   * 渲染栈 id
   */
  id: number;
  /**
   * 起点 x
   */
  x: number;
  /**
   * 起点 y
   */
  y: number;
  /**
   * a (m11) 水平缩放。 b (m12) 垂直倾斜。 c (m21) 水平倾斜。 d (m22) 垂直缩放。 e (dx) 水平移动。 f (dy) 垂直移动。
   */
  matrix: Matrix;

  constructor(
    ctx: CanvasRenderingContext2D,
    { id, x, y }: { id: number; x: number; y: number }
  ) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;

    this.ctx = ctx;
  }
  render() {
    console.log("render");
  }

  resetMatrix() {
    this.matrix = [1, 0, 0, 1, 0, 0];
  }
}
