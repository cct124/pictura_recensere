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
}
