import { BrowserWindow } from "electron";
import WINDOWS from "@/config/WINDOWS";
import windows from "@/scripts/window/windows";
import { queryParams } from "@/utils/tool";
import { MainWindow, WindowManager } from "@/types/type.d";

class WindowManager {
  private windowMap: Map<number, MainWindow.WindowMapValue> = new Map();
  private windowIdMap: Map<WINDOWS, number[]> = new Map();

  /**
   * 创建 window 窗口
   * @param key
   * @returns
   */
  createWindow(key: WINDOWS, options: WindowManager.options = { options: {} }) {
    return new Promise<MainWindow.WindowMapValue | undefined>(
      (resolve, reject) => {
        if (windows.has(key)) {
          const windowConfig = windows.get(key);

          if (windowConfig.unique) {
            this.windowMap.forEach((value) => {
              if (value.type === key) return reject(null);
            });
          }

          const window = new BrowserWindow({
            ...windowConfig.options,
            ...options.options,
          });

          this.windowMap.set(window.id, {
            type: key,
            window,
          });

          if (windowConfig.ready) windowConfig.ready(window);

          let query = "";

          if (options.query) query = "?" + queryParams(options.query);

          window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + query);

          if (process.development === true) {
            if (
              !windowConfig.dev ||
              !windowConfig.dev.devTools ||
              windowConfig.dev.devTools.open !== false
            )
              window.webContents.openDevTools(
                windowConfig.dev &&
                  windowConfig.dev.devTools &&
                  windowConfig.dev.devTools.options
              );

            if (!windowConfig.dev || windowConfig.dev.reload !== false)
              window.webContents.on("before-input-event", (event, input) => {
                if (input.key === "F5") window.webContents.reload();
              });
          }

          window.once("closed", () => {
            this.windowMap.delete(window.id);
          });

          resolve(this.windowMap.get(window.id));
        } else {
          reject(null);
        }
      }
    );
  }

  get(key: number) {
    return this.windowMap.get(key);
  }

  has(key: number) {
    return this.windowMap.has(key);
  }

  getIds(key: WINDOWS) {
    return this.windowIdMap.get(key);
  }

  hasIds(key: WINDOWS) {
    return this.windowIdMap.has(key);
  }
}

export default new WindowManager();
