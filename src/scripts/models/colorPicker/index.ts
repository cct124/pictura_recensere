import { BrowserWindow } from "electron";
import IpcMain from "@/scripts/ipc/Main";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import proxyMain from "@/scripts/ipc/ProxyMain";
import { ColorPicker as _ColorPicker } from "@/plugin/colorPicker";
import colorPicker from "@/scripts/models/colorPicker";

export class ColorPicker extends IpcMain {
  constructor({ channel }: { channel: VALIDCHANNELS }) {
    super({ channel });
  }

  closeColorPicker(...args: unknown[]) {
    const event = args[0] as Electron.IpcMainEvent;
    const color = args[1] as string;
    BrowserWindow.fromWebContents(event.sender).close();
    colorPicker.sendColor(color);
    return Promise.resolve(true);
  }
}

export default proxyMain<ColorPicker, _ColorPicker>(
  new ColorPicker({ channel: VALIDCHANNELS.COLOR_PICKER })
);
