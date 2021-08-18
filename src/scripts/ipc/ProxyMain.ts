import { WebContents, ipcMain } from "electron";
import IpcMain from "@/scripts/ipc/Main";

export default function proxyMain<T extends IpcMain, V>(IpcMainClass: T) {
  function get(target: T, propKey: string | symbol, receiver: unknown) {
    if (Reflect.has(target, propKey)) {
      return Reflect.get(target, propKey, receiver);
    } else {
      return (...args: unknown[]) => {
        return new Promise((resolve, reject) => {
          try {
            // Reflect.apply(Reflect.get(target, "lisOnce", receiver), target, [
            //   tempChannel,
            //   (event: Electron.IpcRendererEvent, args: unknown) => {
            //     resolve(args);
            //   },
            // ]);
            const map: Set<WebContents> = Reflect.get(
              target,
              "rendererMap",
              receiver
            );

            if (map && map.size !== 0) {
              const tempChannel = `${propKey.toString()}-${Date.now().toString()}-${Math.round(
                Math.random() * 10000
              ).toString()}`;
              ipcMain.once(tempChannel, (event, args) => {
                resolve(args);
              });

              map.forEach((sender) => {
                if (!sender.isDestroyed()) {
                  sender.send(
                    Reflect.get(target, "channel", receiver),
                    propKey,
                    tempChannel,
                    ...args
                  );
                } else {
                  map.delete(sender);
                }
              });
            }
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

  return new Proxy(IpcMainClass, { get, set }) as unknown as V;
}
