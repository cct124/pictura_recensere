import WINDOWS from "@/config/WINDOWS";
import { MainWindow } from "@/types/index.d";
import system from "@/scripts/models/system";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

/**
 * 窗口列表类
 */
class Windows {
  /**
   * 窗口配置项保存到 Map 对象
   */
  private windowsMap: Map<WINDOWS, MainWindow.WindowConfig>;

  constructor(windows?: [WINDOWS, MainWindow.WindowConfig][]) {
    this.windowsMap = new Map(windows);
  }

  /**
   * 设置窗口配置项
   * @param key
   * @param value
   * @returns
   */
  set(key: WINDOWS, value: MainWindow.WindowConfig) {
    return this.windowsMap.set(key, value);
  }

  /**
   * 获取窗口配置项
   * @param key
   * @returns
   */
  get(key: WINDOWS) {
    return this.windowsMap.get(key);
  }

  /**
   * 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
   * @param key
   * @returns
   */
  has(key: WINDOWS) {
    return this.windowsMap.has(key);
  }
}

export default new Windows([
  [
    WINDOWS.MAIN,
    {
      loadURL: MAIN_WINDOW_WEBPACK_ENTRY,
      options: {
        width: 1400,
        height: 675,
        frame: false,
        webPreferences: {
          contextIsolation: true,
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
      },
      ready(window) {
        window.on("maximize", () => {
          system.setIsMaximizes(true);
        });
        window.on("unmaximize", () => {
          system.setIsMaximizes(false);
        });
        window.on("blur", () => {
          system.windowBlur();
        });
      },
      dev: {
        devTools: {
          open: true,
        },
      },
    },
  ],
]);
