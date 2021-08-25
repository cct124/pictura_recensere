import RenderStack, { RenderStackEventName } from "./RenderStack";
import Rect from "./RenderStacks/Rect";
import Observer from "@/plugin/observer";

export enum renderStackType {
  rect = "rect",
  image = "image",
  text = "text",
}

export enum CanvasConctrolEventName {
  /**
   * 画布初始化完成
   */
  init = "init",
}

export type CanvasConctrolEvent = {
  type: CanvasConctrolEventName;
  targer: RenderStack;
  sender: CanvasConctrol;
};

export default class CanvasConctrol extends Observer<
  CanvasConctrolEventName,
  CanvasConctrolEvent
> {
  canvas: HTMLCanvasElement;
  options: { backgroundColor?: string };
  ctx: CanvasRenderingContext2D;
  renderStack: Set<RenderStack>;

  constructor(
    canvas: HTMLCanvasElement,
    options: { backgroundColor?: string } = {}
  ) {
    super();
    const { backgroundColor } = options;
    this.options = options;
    this.options.backgroundColor = backgroundColor || "#ffffff";
    this.canvas = canvas;
    this.renderStack = new Set();
  }

  createCanvas() {
    this.ctx = this.canvas.getContext("2d");

    const rect = new Rect(this.ctx, {
      id: 0,
      x: 0,
      y: 0,
      w: this.canvas.width,
      h: this.canvas.height,
      cw: this.canvas.width,
      ch: this.canvas.height,
      fill: this.options.backgroundColor,
      type: renderStackType.rect,
    });

    this.pushStack(rect);
    this.render();

    this.send(CanvasConctrolEventName.init, {
      type: CanvasConctrolEventName.init,
      targer: rect,
      sender: this,
    });
  }

  pushStack(stack: RenderStack) {
    stack.on(RenderStackEventName.change, () => {
      this.render();
    });
    this.renderStack.add(stack);
  }

  render() {
    this.clearCanvas();
    this.renderStack.forEach((stack) => {
      this.ctx.resetTransform();
      stack.render();
    });
  }

  clearCanvas() {
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
