import { BrowserWindow } from "electron";
import IpcMain from "@/scripts/ipc/Main";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import proxyMain from "@/scripts/ipc/ProxyMain";
import { CreateCanvas as _CreateCanvas } from "@/plugin/createCanvas";

export class CreateCanvas extends IpcMain {
  constructor({ channel }: { channel: VALIDCHANNELS }) {
    super({ channel });
  }

  /**
   * 尝试关闭窗口。 该方法与用户手动单击窗口的关闭按钮效果相同。 但网页可能会取消这个关闭操作。
   * @param event
   * @returns
   */
  close(event?: Electron.IpcMainEvent) {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.close();
    return Promise.resolve(true);
  }
}

export default proxyMain<CreateCanvas, _CreateCanvas>(
  new CreateCanvas({ channel: VALIDCHANNELS.CREATE_CANVAS })
);
