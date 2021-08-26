import InputDeviceEvent, { EventType } from "../inputDeviceEvent";

export enum InteractiveType {
  pointer = "pointer",
  /**
   * 创建矩形
   */
  rect = "rect",
  /**
   * 字符串
   */
  text = "text",
}

interface MouseLocations {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

interface MouseDownEvent extends MouseEvent {
  layerX: number;
  layerY: number;
}

export default class InteractiveConctrol extends InputDeviceEvent {
  private interactiveStatus = {
    mouseLeftDown: false,
    mouseRightDown: false,
    keydownAltLeft: false,
    keydownSpace: false,
  };

  private mx: number;
  private my: number;

  private mouseLocations: MouseLocations = {
    sx: null,
    sy: null,
    ex: null,
    ey: null,
  };

  interactiveType = InteractiveType.pointer;
  container: HTMLElement;
  selectAreaEleNode: HTMLCanvasElement;
  selectAreaEleNodeID: string;
  selectAreaEleNodeAppend = false;
  saenCtx: CanvasRenderingContext2D;
  enlarge = 2;
  constructor({ container }: { container: HTMLElement }) {
    super();
    this.container = container;
    this.init();
  }

  init() {
    this.container.style.position = "relative";
    this.createSelectAreaEleNode();
    this.listeners(this.container, EventType.mousedown, this.mousedown);
    this.listeners(this.container, EventType.mouseup, this.mouseup);
    this.listeners(window, EventType.keydown, this.keydown);
    this.listeners(window, EventType.keyup, this.keyup);
    this.listeners(this.container, EventType.mousemove, this.mousemove);
  }

  mousedown(ev: MouseDownEvent) {
    switch (ev.button) {
      case 0:
        this.interactiveStatus.mouseLeftDown = true;
        this.mouseLocations.sx = ev.layerX;
        this.mouseLocations.sy = ev.layerY;
        break;
      case 2:
        this.interactiveStatus.mouseRightDown = true;
        break;
      default:
        break;
    }
  }

  mouseup(ev: MouseDownEvent) {
    switch (ev.button) {
      case 0:
        this.interactiveStatus.mouseLeftDown = false;
        this.mouseLocations.ex = ev.layerX;
        this.mouseLocations.ey = ev.layerY;

        this.clearCtxRect();

        break;
      case 2:
        this.interactiveStatus.mouseRightDown = false;
        break;
      default:
        break;
    }
  }

  keydown(ev: KeyboardEvent) {
    switch (ev.code) {
      case "AltLeft":
        this.interactiveStatus.keydownAltLeft = true;
        break;

      case "Space":
        this.interactiveStatus.keydownSpace = true;
        break;

      default:
        break;
    }
  }

  keyup(ev: KeyboardEvent) {
    switch (ev.code) {
      case "AltLeft":
        this.interactiveStatus.keydownAltLeft = false;
        break;

      case "Space":
        this.interactiveStatus.keydownSpace = false;
        break;

      default:
        break;
    }
  }

  mousemove(ev: MouseDownEvent) {
    if (this.interactiveStatus.mouseLeftDown) {
      this.mouseLocations.ex = ev.layerX;
      this.mouseLocations.ey = ev.layerY;

      const x = this.mouseLocations.sx * this.enlarge;
      const y = this.mouseLocations.sy * this.enlarge;
      const w =
        (this.mouseLocations.ex - this.mouseLocations.sx) * this.enlarge;
      const h =
        (this.mouseLocations.ey - this.mouseLocations.sy) * this.enlarge;

      this.createSelectArea([x, y, w, h]);
    }
  }

  clearCtxRect() {
    this.saenCtx.clearRect(
      0,
      0,
      this.selectAreaEleNode.width,
      this.selectAreaEleNode.height
    );
  }

  createSelectAreaEleNode() {
    this.selectAreaEleNode = document.createElement("canvas");
    this.selectAreaEleNode.style.position = "absolute";
    this.selectAreaEleNodeID = (Date.now() + Math.random() * 10000).toFixed();
    this.selectAreaEleNode.id = this.selectAreaEleNodeID;

    this.selectAreaEleNode.style.top = "0";
    this.selectAreaEleNode.style.left = "0";

    this.selectAreaEleNode.width = this.container.offsetWidth * this.enlarge;
    this.selectAreaEleNode.height = this.container.offsetHeight * this.enlarge;
    this.selectAreaEleNode.style.transform = `scale(${
      1 / this.enlarge
    }) translate(-${this.container.offsetWidth}px, -${
      this.container.offsetHeight
    }px)`;
    this.saenCtx = this.selectAreaEleNode.getContext("2d");

    this.container.appendChild(this.selectAreaEleNode);
  }

  /**
   * 创建选择区域
   */
  createSelectArea(params?: [number, number, number, number]) {
    if (params) {
      this.clearCtxRect();

      switch (this.interactiveType) {
        case InteractiveType.rect:
          this.saenCtx.fillStyle = "#000";
          this.saenCtx.fillRect(...params);
          break;

        default:
          this.saenCtx.strokeStyle = "#000";
          this.saenCtx.lineWidth = 0.4;
          this.saenCtx.strokeRect(...params);
          break;
      }
    }
  }
}
