import RenderStack, { Matrix, RenderStackEventName } from "../../RenderStack";

export default class Rect extends RenderStack {
  /**
   * 范围 width
   */
  w: number;
  /**
   * 范围 height
   */
  h: number;

  cw: number;
  ch: number;

  sx = 1;
  sy = 1;

  deg = 0;

  fill: string;

  path2D: Path2D;
  constructor(
    ctx: CanvasRenderingContext2D,
    {
      id,
      x,
      y,
      w,
      h,
      cw,
      ch,
      fill,
    }: {
      id: number;
      cw: number;
      ch: number;
      x: number;
      y: number;
      w: number;
      h: number;
      fill: string;
    }
  ) {
    super(ctx, { id, x, y });
    this.w = w;
    this.h = h;
    this.cw = cw;
    this.ch = ch;
    this.fill = fill;
    this.path2D = new Path2D();

    this.matrix = new Proxy(this.matrixOrigin, {
      get: (target: Matrix, p: string | symbol, receiver: Matrix) =>
        this.matrixProxyGet(target, p, receiver),
      set: (
        target: Matrix,
        p: string | symbol,
        value: number,
        receiver: Matrix
      ) => this.matrixProxySet(target, p, value, receiver),
    });
  }

  /**
   *  matrix Proxy 的get函数
   * @param target
   * @param p
   * @param receiver
   * @returns
   */
  private matrixProxyGet(target: Matrix, p: string | symbol, receiver: Matrix) {
    return Reflect.get(target, p, receiver);
  }

  /**
   *  matrix Proxy 的set函数
   * @param target
   * @param p
   * @param value
   * @param receiver
   * @returns
   */
  private matrixProxySet(
    target: Matrix,
    p: string | symbol,
    value: number,
    receiver: Matrix
  ): boolean {
    if (parseInt(p as string) > 5)
      throw new Error("index cannot be greater than 5");
    return Reflect.set(target, p, value, receiver);
  }

  rotate(deg: number) {
    const max = 360;
    const min = 0;

    if (deg < min) {
      deg = min;
    }
    if (deg > max) {
      deg = max;
    }

    this.deg = deg;
    this.changeTransform();
    this.send(RenderStackEventName.change, { type: "rotate", targer: this });
  }

  scale(sx: number, sy: number) {
    this.sx = sx;
    this.sy = sy;

    this.changeTransform();
    this.send(RenderStackEventName.change, { type: "scale", targer: this });
  }

  changeTransform() {
    const cos = Math.cos((this.deg * Math.PI) / 180);
    const sin = Math.sin((this.deg * Math.PI) / 180);

    this.matrix[0] = Number(cos.toFixed(6)) * this.sx;
    this.matrix[1] = Number(sin.toFixed(6));
    this.matrix[2] = -Number(sin.toFixed(6));
    this.matrix[3] = Number(cos.toFixed(6)) * this.sy;
  }

  render() {
    const w = this.cw / 2;
    const h = this.ch / 2;

    this.ctx.translate(w, h);
    this.ctx.fillStyle = this.fill;

    this.path2D.rect(
      this.x / this.sx - this.w / 2,
      this.y / this.sy - this.h / 2,
      this.w,
      this.h
    );

    this.ctx.transform(...this.matrix);
    this.ctx.fill(this.path2D);
  }
}
