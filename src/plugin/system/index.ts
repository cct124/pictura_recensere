import IpcRenderer from "@/scripts/ipc/Renderer";
import { System as _System } from "@/scripts/models/system";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import { _IpcRenderer, CreateCanvasInfo } from "@/types/type.d";
import proxyRenderer from "@/scripts/ipc/ProxyRenderer";
import { setIsMaximize } from "@/components/Main/Frame/Titlebar/Control/Maximize";
import { closeAllMenusChild } from "@/components/Main/Frame/Titlebar/Menubar/menu";

export class System extends IpcRenderer {
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    super({ ipc, channel });
  }

  /**
   * 设置最大化或最小化窗口图标状态
   * @param bool
   * @returns
   */
  setIsMaximizes(bool: boolean) {
    setIsMaximize(bool);
    return Promise.resolve(true);
  }

  /**
   *
   * @returns 窗口失去焦点
   */
  windowBlur() {
    closeAllMenusChild();
    return Promise.resolve(true);
  }

  /**
   * 创建画布
   * @param canvasInfo
   * @returns
   */
  onceCreateCanvasInfo(canvasInfo: CreateCanvasInfo) {
    console.log(canvasInfo);
    return Promise.resolve(true);
  }
}

/**
 * 用于主窗口和主进程的通信
 */
export default proxyRenderer<System, _System>(
  new System({
    ipc: window.ipcRenderer,
    channel: VALIDCHANNELS.SYSTEM,
  })
);
