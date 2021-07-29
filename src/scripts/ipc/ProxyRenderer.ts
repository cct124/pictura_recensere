import IpcRenderer from "@/scripts/ipc/Renderer";

export default function proxyRenderer<T extends IpcRenderer, V>(
  IpcRendererClass: T
) {
  function get(target: T, propKey: string | symbol, receiver: unknown) {
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
    target: T,
    propKey: string | symbol,
    value: unknown,
    receiver: unknown
  ) {
    return Reflect.set(target, propKey, value, receiver);
  }

  return new Proxy(IpcRendererClass, { get, set }) as unknown as V;
}
