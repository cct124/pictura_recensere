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

  /**
   * 画布尺寸 width
   */
  cw: number;
  /**
   * 画布尺寸 height
   */
  ch: number;

  /**
   * x轴缩放
   */
  sx = 1;
  /**
   * y轴缩放
   */
  sy = 1;

  /**
   * 旋转角度
   */
  deg = 0;

  /**
   * 填充颜色
   */
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
      type,
    }: {
      id: number;
      cw: number;
      ch: number;
      x: number;
      y: number;
      w: number;
      h: number;
      fill: string;
      type: unknown;
    }
  ) {
    super(ctx, { id, x, y, type });
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

  /**
   * rect 旋转角度
   * @param deg
   */
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

  /**
   * rect 缩放
   * @param sx
   * @param sy
   */
  scale(sx: number, sy: number) {
    this.sx = sx;
    this.sy = sy;

    this.changeTransform();
    this.send(RenderStackEventName.change, { type: "scale", targer: this });
  }

  /**
   * 移动
   * @param x
   * @param y
   */
  move(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.send(RenderStackEventName.change, { type: "move", targer: this });
  }

  changeTransform() {
    const cos = Math.cos((this.deg * Math.PI) / 180);
    const sin = Math.sin((this.deg * Math.PI) / 180);

    this.matrix[0] = Number(cos.toFixed(6)) * this.sx;
    this.matrix[1] = Number(sin.toFixed(6));
    this.matrix[2] = -Number(sin.toFixed(6));
    this.matrix[3] = Number(cos.toFixed(6)) * this.sy;
  }

  /**
   * 渲染
   */
  render() {
    if (!this.visibility) return;

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
