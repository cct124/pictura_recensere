import { _IpcRenderer } from "@/types/index.d";
import { VALIDCHANNELS } from "@/config/ipcChannels";

class IpcRenderer {
  private ipc: _IpcRenderer;
  private channel: VALIDCHANNELS;
  constructor({ ipc, channel }: { ipc: _IpcRenderer; channel: VALIDCHANNELS }) {
    this.ipc = ipc;
    this.channel = channel;
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
}

function get(target: IpcRenderer, propKey: string | symbol, receiver: unknown) {
  if (Reflect.has(target, propKey)) {
    return Reflect.get(target, propKey, receiver);
  } else {
    return (...args: unknown[]) => {
      return new Promise((resolve, reject) => {
        try {
          const tempChannel = `${propKey.toString()}-${Date.now().toString()}-${Math.round(
            Math.random() * 10000
          ).toString()}`;

          Reflect.apply(Reflect.get(target, "lisOnce", receiver), target, [
            tempChannel,
            (event: Electron.IpcRendererEvent, args: unknown) => {
              resolve(args);
            },
          ]);

          Reflect.apply(Reflect.get(target, "send", receiver), target, [
            propKey,
            tempChannel,
            ...args,
          ]);
        } catch (error) {
          reject(error);
        }
      });
    };
  }
}

function set(
  target: IpcRenderer,
  propKey: string | symbol,
  value: unknown,
  receiver: unknown
) {
  console.log(target, propKey, value, receiver);
  return Reflect.set(target, propKey, value, receiver);
}

export default new Proxy(IpcRenderer, {
  construct: function (target, args) {
    return new Proxy(new target({ ...args[0] }), { get, set });
  },
});
