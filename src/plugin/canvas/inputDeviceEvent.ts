export enum EventType {
  wheel = "wheel",
  keydown = "keydown",
  keyup = "keyup",
  /**
   * 鼠标按下
   */
  mousedown = "mousedown",
  /**
   * 鼠标释放
   */
  mouseup = "mouseup",
  /**
   * 鼠标移动
   */
  mousemove = "mousemove",
}

export type DeviceListener = {
  target: Window | HTMLElement;
  type: EventType;
  // eslint-disable-next-line
  listener: (ev: any) => void;
  remove?: () => void;
};

export default class InputDeviceEvent {
  private deviceListeners = new Set<DeviceListener>();

  /**
   * 监听输入设备事件
   */
  protected listeners(
    target: HTMLElement | Window,
    type: EventType,
    // eslint-disable-next-line
    listener: (ev: any) => void
  ) {
    
    target.addEventListener(type, (...args) => {
      listener.apply(this, args);
    });

    this.deviceListeners.add({
      target,
      type,
      listener,
      remove: () => {
        target.removeEventListener(type, listener);
      },
    });
  }

  /**
   * 销毁所有监听的事件
   */
  protected destroyedInputDeviceListeners() {
    this.deviceListeners.forEach((handle) => {
      if (handle.remove) handle.remove();
    });
  }
}
