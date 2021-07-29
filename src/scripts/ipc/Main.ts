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
    ipcMain.on(channel, (...args: unknown[]) =>
      // this.listenerHandle.apply(this, ...args)
      Reflect.apply(this.listenerHandle, this, args)
    );
  }

  listenerHandle(
    event: Electron.IpcMainEvent,
    propKey: string,
    tempChannel: string,
    ...args: unknown[]
  ) {
    Reflect.get(
      this,
      propKey
    )(...args).then((res: unknown) => {
      event.reply(tempChannel, res);
    });
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
