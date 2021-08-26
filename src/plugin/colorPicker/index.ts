import IpcRenderer from "@/scripts/ipc/Renderer";
import { ColorPicker as _ColorPicker } from "@/scripts/models/colorPicker";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import { _IpcRenderer } from "@/types/type.d";
import proxyRenderer from "@/scripts/ipc/ProxyRenderer";
import { setBackgroundColor } from "@/components/UI/Form/ColorPicker";

export class ColorPicker extends IpcRenderer {
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    super({ ipc, channel });
  }

  sendColor(value: string, id: number) {
    if (setBackgroundColor) setBackgroundColor(value, Number(id));
    return Promise.resolve(true);
  }
}

/**
 * 用于主窗口和主进程的通信
 */
export default proxyRenderer<ColorPicker, _ColorPicker>(
  new ColorPicker({
    ipc: window.ipcRenderer,
    channel: VALIDCHANNELS.COLOR_PICKER,
  })
);
