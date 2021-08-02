import IpcRenderer from "@/scripts/ipc/Renderer";
import { System as _System } from "@/scripts/models/system";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import { _IpcRenderer } from "@/types/index.d";
import proxyRenderer from "@/scripts/ipc/ProxyRenderer";
import { setIsMaximize } from "@/components/Frame/Titlebar/Control/Maximize";

export class System extends IpcRenderer {
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    super({ ipc, channel });
  }

  run() {
    return Promise.resolve("test");
  }

  setIsMaximizes(bool: boolean) {
    setIsMaximize(bool);
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
