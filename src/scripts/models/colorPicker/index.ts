import IpcMain from "@/scripts/ipc/Main";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import proxyMain from "@/scripts/ipc/ProxyMain";
import { ColorPicker as _ColorPicker } from "@/plugin/colorPicker";

export class ColorPicker extends IpcMain {
  constructor({ channel }: { channel: VALIDCHANNELS }) {
    super({ channel });
  }
}

export default proxyMain<ColorPicker, _ColorPicker>(
  new ColorPicker({ channel: VALIDCHANNELS.COLOR_PICKER })
);
