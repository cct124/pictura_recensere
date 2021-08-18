import { ipcMain, WebContents } from "electron";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";

export default class IpcMain {
  private channel: VALIDCHANNELS;
  private rendererMap: Set<WebContents>;

  constructor({ channel }: { channel: VALIDCHANNELS }) {
    this.channel = channel;
    this.rendererMap = new Set();
    this.init();
  }

  private init() {
    this.listener(this.channel);
    this.ipcRendererInit(this.channel);
  }

  private listener(channel: VALIDCHANNELS) {
    ipcMain.on(channel, (...args: unknown[]) =>
      // this.listenerHandle.apply(this, ...args)
      Reflect.apply(this.listenerHandle, this, args)
    );
  }

  private ipcRendererInit(channel: string) {
    ipcMain.on(`${channel}-init`, (...args: unknown[]) =>
      // this.listenerHandle.apply(this, ...args)
      Reflect.apply(this.ipcRendererInitHandle, this, args)
    );
  }

  private listenerHandle(
    event: Electron.IpcMainEvent,
    propKey: string,
    tempChannel: string,
    ...args: unknown[]
  ) {
    Reflect.get(this, propKey)(event, ...args).then((res: unknown) => {
      event.reply(tempChannel, res);
    });
  }

  private ipcRendererInitHandle(event: Electron.IpcMainEvent) {
    this.rendererMap.add(event.sender);
  }
}
