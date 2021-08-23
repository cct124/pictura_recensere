import { Layer } from "@/types/type.d";

export enum LayerType {
  background = "background",
  image = "image",
  text = "text",
}

export default class CanvasConctrol {
  canvas: HTMLCanvasElement;
  options: { backgroundColor?: string };
  ctx: CanvasRenderingContext2D;
  layer: Set<Layer.LayerMeta>;

  constructor(
    canvas: HTMLCanvasElement,
    options: { backgroundColor?: string } = {}
  ) {
    const { backgroundColor } = options;
    this.options = options;
    this.options.backgroundColor = backgroundColor || "#ffffff";
    this.canvas = canvas;
    this.layer = new Set();

    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext("2d");
    this.backgroundRender(this.options.backgroundColor);
  }

  backgroundRender(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(color);

    this.layer.add({
      index: 0,
      name: "背景",
      type: LayerType.background,
      active: true,
      meta: {
        color,
      },
    });
  }
}
