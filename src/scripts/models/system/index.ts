import os from "os";
import { app } from "electron";
import IpcMain from "@/scripts/ipc/Main";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import proxyMain from "@/scripts/ipc/ProxyMain";
import { System as _System } from "@/plugin/system";
import windowManager from "@/scripts/window/manager";
import WINDOWS from "@/config/WINDOWS";

export class System extends IpcMain {
  constructor({ channel }: { channel: VALIDCHANNELS }) {
    super({ channel });
  }

  getSysteamInfo() {
    return Promise.resolve({
      platform: process.platform,
      versions: process.versions,
      systemType: os.type(),
      arch: os.arch(),
      systemVersion: os.release(),
      appVersion: app.getVersion(),
    });
  }

  /**
   * 最小化窗口。 在某些平台上, 最小化的窗口将显示在Dock中。
   * @param event
   * @returns
   */
  minimize(event?: Electron.IpcMainEvent) {
    windowManager.get(event.frameId).window.minimize();
    return Promise.resolve(true);
  }

  /**
   * 最大化窗口。 如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)。
   * @param event
   * @returns
   */
  maximize(event?: Electron.IpcMainEvent) {
    windowManager.get(event.frameId).window.maximize();
    return Promise.resolve(true);
  }

  /**
   * 取消窗口最大化
   * @param event
   * @returns
   */
  unmaximize(event?: Electron.IpcMainEvent) {
    windowManager.get(event.frameId).window.unmaximize();
    return Promise.resolve(true);
  }

  /**
   * 尝试关闭窗口。 该方法与用户手动单击窗口的关闭按钮效果相同。 但网页可能会取消这个关闭操作。
   * @param event
   * @returns
   */
  close(event?: Electron.IpcMainEvent) {
    windowManager.get(event.frameId).window.close();
    return Promise.resolve(true);
  }

  /**
   * 打开chrome调试工具
   * @param event
   * @returns
   */
  openDeveloperTools(event?: Electron.IpcMainEvent) {
    windowManager.get(event.frameId).window.webContents.openDevTools();
    return Promise.resolve(true);
  }

  /**
   * 刷新当前页面
   * @param event
   * @returns
   */
  reload(event?: Electron.IpcMainEvent) {
    windowManager.get(event.frameId).window.webContents.reload();
    return Promise.resolve(true);
  }

  /**
   * 创建画布
   * @returns
   */
  createCanvas(event?: Electron.IpcMainEvent) {
    const parent = windowManager.get(event.frameId).window;
    windowManager.createWindow(WINDOWS.CREATE_CANVAS, {
      options: { parent },
    });

    return Promise.resolve(true);
  }
}

export default proxyMain<System, _System>(
  new System({ channel: VALIDCHANNELS.SYSTEM })
);
