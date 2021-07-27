import { contextBridge, ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/config/ipcChannels";

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: VALIDCHANNELS, data: any) => {
    if (VALIDCHANNELS[channel]) {
      ipcRenderer.send(channel, data);
    }
  },
});
