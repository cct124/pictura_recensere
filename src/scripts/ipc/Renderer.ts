import { _IpcRenderer } from "@/types/type.d";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";

export default class IpcRenderer {
  private ipc: _IpcRenderer;
  private channel: VALIDCHANNELS;
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    this.ipc = ipc;
    this.channel = channel;
    this.init();
    this.listener(this.channel);
  }

  private init() {
    this.ipc.lisSend(`${this.channel}-init`);
  }

  private send(...args: unknown[]) {
    this.ipc.send(this.channel, ...args);
  }

  private on(listener: (...args: unknown[]) => unknown) {
    this.ipc.on(this.channel, listener);
  }

  private lisOnce(channel: string, listener: (...args: unknown[]) => unknown) {
    this.ipc.lisOnce(channel, listener);
  }

  private listener(channel: VALIDCHANNELS) {
    this.ipc.on(channel, (...args) => {
      Reflect.apply(this.listenerHandle, this, args);
    });
  }

  private listenerHandle(
    event: Electron.IpcMainEvent,
    propKey: string,
    tempChannel: string,
    ...args: unknown[]
  ) {
    Reflect.get(
      this,
      propKey
    )(...args).then((res: unknown) => {
      this.ipc.lisSend(tempChannel, res);
    });
  }
}
