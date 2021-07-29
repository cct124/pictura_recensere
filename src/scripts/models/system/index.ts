import os from "os";
import { app } from "electron";
import IpcMain from "@/scripts/ipc/Main";
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import proxyMain from "@/scripts/ipc/ProxyMain";
import { System as _System } from "@/plugin/system";

export class System extends IpcMain {
  constructor({ channel }: { channel: VALIDCHANNELS }) {
    super({ channel });
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

export default proxyMain<System, _System>(
  new System({ channel: VALIDCHANNELS.SYSTEM })
);
