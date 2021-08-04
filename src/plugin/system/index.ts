import IpcRenderer from "@/scripts/ipc/Renderer";
import { System as _System } from "@/scripts/models/system";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import { _IpcRenderer } from "@/types/index.d";
import proxyRenderer from "@/scripts/ipc/ProxyRenderer";
import { setIsMaximize } from "@/components/Frame/Titlebar/Control/Maximize";
import { closeAllMenusChild } from "@/components/Frame/Titlebar/Menubar/menu";

export class System extends IpcRenderer {
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    super({ ipc, channel });
  }

  run() {
    return Promise.resolve("test");
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
}

/**
 * 系统控制
 */
export default proxyRenderer<System, _System>(
  new System({
    ipc: window.ipcRenderer,
    channel: VALIDCHANNELS.SYSTEM,
  })
);
