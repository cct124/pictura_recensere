import { contextBridge, ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/config/ipcChannels";

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
});
