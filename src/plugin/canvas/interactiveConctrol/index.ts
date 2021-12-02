import InputDeviceEvent, { EventType } from "../inputDeviceEvent";

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

export enum ICEventType {
  /**
   * 空格键和鼠标左键按下拖动
   */
  spaceMouseLeftDownMove = "spaceMouseLeftDownMove",
  /**
   * 空格键和鼠标左键按下拖动
   */
  mouseLeftDownMove = "mouseLeftDownMove",
}

export type Event = {
  type: ICEventType;
  targer: unknown;
  sender: InteractiveConctrol;
};

export interface RectParamsType {
  params: {
    color: string;
    rect: MouseLocations;
  };
}

export default class InteractiveConctrol extends InputDeviceEvent<
  ICEventType,
  Event
> {
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

  container: HTMLElement;
  selectAreaEleNode: HTMLCanvasElement;
  selectAreaEleNodeID: string;
  selectAreaEleNodeAppend = false;
  enlarge = 1;
  colorPicker = "#ffffff";
  createRectFillOpacity = 0.5;
  selectAreaInfo: [number, number, number, number];
  constructor({ container }: { container: HTMLElement }) {
    super();
    this.container = container;
    this.init();
  }

  init() {
    this.container.style.position = "relative";
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
    if (
      this.interactiveStatus.mouseLeftDown &&
      this.interactiveStatus.keydownSpace
    ) {
      this.send(ICEventType.spaceMouseLeftDownMove, {
        type: ICEventType.spaceMouseLeftDownMove,
        targer: ev,
        sender: this,
      });
    }
    if (
      this.interactiveStatus.mouseLeftDown &&
      !this.interactiveStatus.keydownSpace
    ) {
      this.send(ICEventType.mouseLeftDownMove, {
        type: ICEventType.mouseLeftDownMove,
        targer: ev,
        sender: this,
      });
    }
  }
}
