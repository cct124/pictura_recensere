import IpcRenderer from "@/scripts/ipc/Renderer";
import { CreateCanvas as _CreateCanvas } from "@/scripts/models/createCanvas";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import { _IpcRenderer } from "@/types/type.d";
import proxyRenderer from "@/scripts/ipc/ProxyRenderer";

export class CreateCanvas extends IpcRenderer {
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    super({ ipc, channel });
  }
}

/**
 * 用于主窗口和主进程的通信
 */
export default proxyRenderer<CreateCanvas, _CreateCanvas>(
  new CreateCanvas({
    ipc: window.ipcRenderer,
    channel: VALIDCHANNELS.CREATE_CANVAS,
  })
);
