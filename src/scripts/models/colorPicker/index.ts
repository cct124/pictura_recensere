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

  /**
   * 关闭拾色器窗口 并将选取的色值返回
   * @param args
   * @returns
   */
  closeColorPicker(...args: unknown[]) {
    const event = args[0] as Electron.IpcMainEvent;
    const color = args[1] as string;
    const id = args[2] as number;
    BrowserWindow.fromWebContents(event.sender).close();
    colorPicker.sendColor(color, id);
    return Promise.resolve(true);
  }
}

export default proxyMain<ColorPicker, _ColorPicker>(
  new ColorPicker({ channel: VALIDCHANNELS.COLOR_PICKER })
);
