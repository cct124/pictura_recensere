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
  pushStack = "pushStack",
}

export type CanvasConctrolEvent = {
  type: CanvasConctrolEventName;
  targer: RenderStack;
  sender: CanvasConctrol;
};

type RenderStackId = {
  value: number;
};

export default class CanvasConctrol extends Observer<
  CanvasConctrolEventName,
  CanvasConctrolEvent
> {
  canvas: HTMLCanvasElement;
  options: { backgroundColor?: string };
  ctx: CanvasRenderingContext2D;
  renderStack: Set<RenderStack>;
  renderStackId: RenderStackId = {
    value: 0,
  };
  originRenderStackId: RenderStackId = {
    value: 0,
  };

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
    this.proxyRenderStackId();
  }

  createCanvas() {
    this.ctx = this.canvas.getContext("2d");

    const rect = new Rect(this.ctx, {
      id: this.renderStackId.value,
      x: 0,
      y: 0,
      w: this.canvas.width,
      h: this.canvas.height,
      cw: this.canvas.width,
      ch: this.canvas.height,
      fill: this.options.backgroundColor,
      type: renderStackType.rect,
    });

    // rect.rotate(45);

    this.pushStack(rect);

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
    this.send(CanvasConctrolEventName.pushStack, {
      type: CanvasConctrolEventName.pushStack,
      targer: stack,
      sender: this,
    });
    this.renderStack.add(stack);

    this.render();
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

  createRect({
    x,
    y,
    w,
    h,
    fill,
  }: {
    x: number;
    y: number;
    w: number;
    h: number;
    fill: string;
  }) {
    const rect = new Rect(this.ctx, {
      id: this.renderStackId.value,
      x,
      y,
      w,
      h,
      cw: this.canvas.width,
      ch: this.canvas.height,
      fill,
      type: renderStackType.rect,
    });

    this.pushStack(rect);

    return rect;
  }

  proxyRenderStackId() {
    this.renderStackId = new Proxy(this.originRenderStackId, {
      get: (
        target: RenderStackId,
        p: string | symbol,
        receiver: RenderStackId
      ) => {
        const result = Reflect.get(target, p, receiver);
        Reflect.set(target, p, result + 1, receiver);
        return result;
      },
      set: (
        target: RenderStackId,
        p: string | symbol,
        value: number,
        receiver: RenderStackId
      ) => {
        const Result = Reflect.set(target, p, value, receiver);
        return Result;
      },
    });
  }
}
