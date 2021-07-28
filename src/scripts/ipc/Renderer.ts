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
}

function get(target: IpcRenderer, propKey: string | symbol, receiver: unknown) {
  console.log(target, propKey, receiver);
  if (Reflect.has(target, propKey)) {
    return Reflect.get(target, propKey, receiver);
  } else {
    return (...args: unknown[]) => {
      Reflect.apply(Reflect.get(target, "send", receiver), target, [
        propKey,
        ...args,
      ]);
      return Promise.resolve();
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
