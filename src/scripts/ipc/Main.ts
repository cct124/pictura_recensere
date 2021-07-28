import os from "os";
import { app, ipcMain } from "electron";
import { VALIDCHANNELS } from "@/config/ipcChannels";

export default class IpcMain {
  private channel: VALIDCHANNELS;
  constructor({ channel }: { channel: VALIDCHANNELS }) {
    this.channel = channel;
    this.listener(this.channel);
  }

  listener(channel: VALIDCHANNELS) {
    ipcMain.on(channel, this.listenerHandle);
  }

  listenerHandle(
    event: Electron.IpcMainEvent,
    propKey: string,
    ...args: unknown[]
  ) {
    console.log(propKey);
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
}
