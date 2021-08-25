import RenderStack, { RenderStackEventName } from "./RenderStack";
import Rect from "./RenderStacks/Rect";

export enum layerType {
  rect = "rect",
  image = "image",
  text = "text",
}

export default class CanvasConctrol {
  canvas: HTMLCanvasElement;
  options: { backgroundColor?: string };
  ctx: CanvasRenderingContext2D;
  renderStack: Set<RenderStack>;

  constructor(
    canvas: HTMLCanvasElement,
    options: { backgroundColor?: string } = {}
  ) {
    const { backgroundColor } = options;
    this.options = options;
    this.options.backgroundColor = backgroundColor || "#ffffff";
    this.canvas = canvas;
    this.renderStack = new Set();
    this.init();
  }

  init() {
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
    });

    this.pushStack(rect);

    rect.rotate(45);

    const rect2 = new Rect(this.ctx, {
      id: 0,
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      cw: this.canvas.width,
      ch: this.canvas.height,
      fill: "red",
    });
    this.pushStack(rect2);

    rect2.scale(2, 2);

    rect2.rotate(10);
    
    this.render();
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
