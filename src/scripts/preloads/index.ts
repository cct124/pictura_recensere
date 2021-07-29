import { contextBridge, ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: VALIDCHANNELS, ...args: unknown[]) => {
    if (VALIDCHANNELS[channel]) {
      ipcRenderer.send(channel, ...args);
    }
  },
  on: (channel: VALIDCHANNELS, listener: (...args: unknown[]) => unknown) => {
    if (VALIDCHANNELS[channel]) {
      // Deliberately strip event as it includes `sender`
      const subscription = (
        event: Electron.IpcRendererEvent,
        ...args: unknown[]
      ) => listener(event, ...args);
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
  },
  once: (channel: VALIDCHANNELS, listener: (...args: unknown[]) => unknown) => {
    if (VALIDCHANNELS[channel]) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => listener(...args));
    }
  },
  lisSend: (channel: VALIDCHANNELS, ...args: unknown[]) => {
    ipcRenderer.send(channel, ...args);
  },
  lisOnce: (channel: string, listener: (...args: unknown[]) => unknown) => {
    ipcRenderer.once(channel, (event, ...args) => listener(event, ...args));
  },
});
