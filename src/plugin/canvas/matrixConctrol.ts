enum EventType {
  wheel = "wheel",
  keydown = "keydown",
  keyup = "keyup",
  mousedown = "mousedown",
  mouseup = "mouseup",
  mousemove = "mousemove",
}

enum CursorStyle {
  default = "default",
  pointer = "pointer",
}

interface WebkitWheelEvent extends WheelEvent {
  layerX: number;
  layerY: number;
}

export default class MatrixConctrol {
  private container: HTMLElement;
  private targer: HTMLElement;
  private matrixOrigin = [1, 0, 0, 1, 0, 0];
  private transformOrigin = [0, 0];
  private keyboard = {
    AltLeft: false,
    mousedown: false,
    space: false,
  };
  private deviceListener: {
    target: Window | HTMLElement;
    type: EventType;
    // eslint-disable-next-line
    listener: (ev: any) => void;
    remove?: () => void;
  }[] = [];
  private floatPrecision = 100;
  private mousemove = {
    x: 0,
    y: 0,
  };

  private translate = {
    x: 0,
    y: 0,
  };

  private zoomNegative: boolean;

  matrix: number[];
  origin: number[];
  scaleStep;
  matrixChange;

  constructor({
    container,
    targer,
    scaleStep = 0.15,
    zoomNegative = false,
    matrixChange,
  }: {
    /**
     * 容器
     */
    container: HTMLElement;
    /**
     * 需要 matrix 控制的目标
     */
    targer: HTMLElement;

    /**
     * 缩放系数
     */
    scaleStep?: number;
    /**
     * matrix 变化时调用此函数
     */
    matrixChange?: (matrix: number[]) => void;

    /**
     * 是否允许缩放值为负数
     */
    zoomNegative?: boolean;
  }) {
    this.container = container;
    this.targer = targer;
    this.scaleStep = scaleStep;
    this.matrixChange = matrixChange;
    this.zoomNegative = zoomNegative;

    this.matrix = new Proxy(this.matrixOrigin, {
      get: (target: number[], p: string | symbol, receiver: number[]) =>
        this.matrixProxyGet(target, p, receiver),
      set: (
        target: number[],
        p: string | symbol,
        value: number,
        receiver: number[]
      ) => this.matrixProxySet(target, p, value, receiver),
    });

    this.center();

    this.origin = new Proxy(this.transformOrigin, {
      get: (target: number[], p: string | symbol, receiver: number[]) =>
        this.originProxyGet(target, p, receiver),
      set: (
        target: number[],
        p: string | symbol,
        value: number,
        receiver: number[]
      ) => this.originProxySet(target, p, value, receiver),
    });

    this.originCenter();

    this.setTargerMatrix(this.matrixOrigin);

    this.inputDeviceListener();
  }

  /**
   * 将target位移到container的中间
   */
  center(): void {
    const x = this.container.offsetWidth / 2 - this.targer.offsetWidth / 2;
    const y = this.container.offsetHeight / 2 - this.targer.offsetHeight / 2;
    this.matrix[4] = x;
    this.matrix[5] = y;
    this.translate.x = this.matrix[4] * this.matrix[0];
    this.translate.y = this.matrix[5] * this.matrix[3];
  }

  /**
   * 设置 target 的中心点
   */
  private originCenter() {
    this.origin[0] = this.targer.offsetWidth / 2;
    this.origin[1] = this.targer.offsetHeight / 2;
  }

  /**
   * 设置 matrix 的值
   * @param matrix
   * @returns
   */
  set(matrix: number[]): number[] {
    this.matrix = matrix;
    this.setTargerMatrix(this.matrix);
    return this.matrix;
  }

  /**
   *  matrix Proxy 的get函数
   * @param target
   * @param p
   * @param receiver
   * @returns
   */
  private matrixProxyGet(
    target: number[],
    p: string | symbol,
    receiver: number[]
  ) {
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
    target: number[],
    p: string | symbol,
    value: number,
    receiver: number[]
  ): boolean {
    if (parseInt(p as string) > 5)
      throw new Error("index cannot be greater than 5");
    const Result = Reflect.set(target, p, this.fp(value), receiver);
    this.setTargerMatrix(receiver);
    return Result;
  }
 
  /**
   * 设置 Matrix 元素的 style 属性上
   * @param matrix
   */
  private setTargerMatrix(matrix: number[]) {
    console.dir(this.targer);
    this.targer.style.transform = `matrix(${matrix.join()})`;
  }

  /**
   *  origin Proxy 的get函数
   * @param target
   * @param p
   * @param receiver
   * @returns
   */
  private originProxyGet(
    target: number[],
    p: string | symbol,
    receiver: number[]
  ) {
    return Reflect.get(target, p, receiver);
  }

  /**
   *  origin Proxy 的set函数
   * @param target
   * @param p
   * @param value
   * @param receiver
   * @returns
   */
  private originProxySet(
    target: number[],
    p: string | symbol,
    value: number,
    receiver: number[]
  ): boolean {
    if (parseInt(p as string) > 1)
      throw new Error("index cannot be greater than 1");
    const Result = Reflect.set(target, p, this.fp(value), receiver);
    this.setTargerOrigin(receiver);
    return Result;
  }

  /**
   * 设置 origin 元素的 style 属性上
   * @param origin
   */
  private setTargerOrigin(origin: number[]) {
    this.targer.style.transformOrigin = `${origin[0]}px ${origin[1]}px`;
  }

  /**
   * 监听输入设备事件
   */
  private inputDeviceListener() {
    this.listeners(this.container, EventType.wheel, this.mouseWheel);
    this.listeners(window, EventType.keydown, this.KeyboardInputHandle);
    this.listeners(window, EventType.keyup, this.KeyboardInputHandle);
    this.listeners(this.container, EventType.mousedown, this.mousedownHandle);
    this.listeners(this.container, EventType.mouseup, this.mousedownHandle);
    this.listeners(this.container, EventType.mousemove, this.mouseoverHandle);

    for (const iterator of this.deviceListener) {
      iterator.target.addEventListener(iterator.type, (...args) => {
        iterator.listener.apply(this, args);
      });
      iterator.remove = () => {
        iterator.target.removeEventListener(iterator.type, iterator.listener);
      };
    }
  }

  /**
   * 销毁所有监听的事件
   */
  private destroyedInputDeviceListener() {
    this.deviceListener.forEach((handle) => {
      if (handle.remove) handle.remove();
    });
  }

  /**
   * 监听输入设备事件
   */
  private listeners(
    target: HTMLElement | Window,
    type: EventType,
    // eslint-disable-next-line
    listener: (ev: any) => void
  ) {
    this.deviceListener.push({ target, type, listener });
  }

  /**
   * 鼠标滚轮事件
   */
  private mouseWheel(ev: WebkitWheelEvent) {
    if (this.keyboard.AltLeft) {
      this.origin[0] = this.fp(ev.layerX - this.translate.x) / this.matrix[0];
      this.origin[1] = this.fp(ev.layerY - this.translate.y) / this.matrix[3];

      const ratioX = this.fp(
        this.fp(ev.layerX - this.translate.x) /
          (this.matrix[0] * this.targer.offsetWidth)
      );
      const ratioY = this.fp(
        this.fp(ev.layerY - this.translate.y) /
          (this.matrix[3] * this.targer.offsetHeight)
      );

      /**
       * 放大
       */
      if (ev.deltaY < 0) {
        this.matrix[0] += this.scaleStep;
        this.matrix[3] += this.scaleStep;
        /**
         * 缩小
         */
      } else {
        if (this.zoomNegative) {
          this.matrix[0] -= this.scaleStep;
          this.matrix[3] -= this.scaleStep;
        } else {
          const x = this.matrix[0] - this.scaleStep;
          const y = this.matrix[3] - this.scaleStep;

          if (x > 0) {
            this.matrix[0] = x;
            this.matrix[3] = y;
          }
        }
      }

      this.matrix[4] = ev.layerX - ratioX * this.targer.offsetWidth;
      this.matrix[5] = ev.layerY - ratioY * this.targer.offsetHeight;

      this.translate.x = this.fp(
        ev.layerX - ratioX * (this.matrix[0] * this.targer.offsetWidth)
      );
      this.translate.y = this.fp(
        ev.layerY - ratioY * (this.matrix[3] * this.targer.offsetHeight)
      );

      if (this.matrixChange) this.matrixChange(this.matrix);
    }
  }

  /**
   * 左Alt键
   * @param ev
   * @returns
   */
  private KeyboardInputHandle(ev: KeyboardEvent) {
    switch (ev.code) {
      case "AltLeft":
        if (this.keyboard.AltLeft === (ev.type === EventType.keydown)) return;
        this.keyboard.AltLeft = ev.type === EventType.keydown;
        break;

      case "Space":
        if (this.keyboard.space === (ev.type === EventType.keydown)) return;
        this.keyboard.space = ev.type === EventType.keydown;
        this.keyboard.space
          ? this.cursorContainer(CursorStyle.pointer)
          : this.cursorContainer(CursorStyle.default);
        break;

      default:
        break;
    }
  }

  /**
   * 鼠标左键
   * @param ev
   * @returns
   */
  private mousedownHandle(ev: MouseEvent) {
    if (ev.button !== 0) return;
    if (this.keyboard.mousedown === (ev.type === EventType.mousedown)) return;
    this.keyboard.mousedown = ev.type === EventType.mousedown;
    if (!this.keyboard.mousedown) {
      this.mousemove.x = this.mousemove.y = 0;
    }
  }

  private mouseoverHandle(ev: MouseEvent) {
    if (this.keyboard.mousedown && this.keyboard.space) {
      if (this.mousemove.x !== 0) {
        const x = this.mousemove.x - ev.x;
        this.mousemove.x = ev.x;
        this.matrix[4] -= x;
        this.translate.x -= x;
      } else {
        this.mousemove.x = ev.x;
      }

      if (this.mousemove.y !== 0) {
        const y = this.mousemove.y - ev.y;
        this.mousemove.y = ev.y;
        this.matrix[5] -= y;
        this.translate.y -= y;
      } else {
        this.mousemove.y = ev.y;
      }

      if (this.matrixChange) this.matrixChange(this.matrix);
    }
  }

  /**
   * 保留两位小数
   * @param val
   * @returns
   */
  fp(val: number): number {
    return Math.round(val * this.floatPrecision) / this.floatPrecision;
  }

  cursorContainer(style: CursorStyle): void {
    this.container.style.cursor = style;
  }
}
