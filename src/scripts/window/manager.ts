import { BrowserWindow } from "electron";
import WINDOWS from "@/config/WINDOWS";
import windows from "@/scripts/window/windows";
import { queryParams } from "@/utils/tool";
import { MainWindow, WindowManager } from "@/types/type.d";

/**
 * 窗口控制类
 */
class WindowManager {
  private windowMap: Map<number, MainWindow.WindowMapValue> = new Map();
  private windowIdMap: Map<WINDOWS, number[]> = new Map();

  /**
   * 创建 window 窗口
   * @param key
   * @returns
   */
  createWindow(key: WINDOWS, options: WindowManager.options = { options: {} }) {

    // 创建窗口是一个异步过程
    return new Promise<MainWindow.WindowMapValue | undefined>(
      (resolve, reject) => {

        // 是否有对应窗口的定义，没有则创建失败
        if (windows.has(key)) {
          const windowConfig = windows.get(key);

          // 是否只能创建一个窗口
          if (windowConfig.unique) {
            this.windowMap.forEach((value) => {
              if (value.type === key) return reject(null);
            });
          }

          // 创建窗口载入配置
          const window = new BrowserWindow({
            ...windowConfig.options,
            ...options.options,
          });

          // 将窗口实例 保存到 windowMap 对象中
          this.windowMap.set(window.id, {
            type: key,
            window,
          });

          // 调用窗口创建完成事件
          if (windowConfig.ready) windowConfig.ready(window);

          // 带上定义时配置的 query 参数到 URL 中
          let query = "?";
          if (options.query) query = query + queryParams(options.query);

          // 窗口加载的网页 url
          window.loadURL(
            MAIN_WINDOW_WEBPACK_ENTRY + query + windowConfig.loadURL
          );

          // 开发环境配置对应的调试工具
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

          // 窗口关闭时删除保存在 windowMap 中的窗口实例
          window.once("close", () => {
            this.windowMap.delete(window.id);
          });

          // 创建完成
          resolve(this.windowMap.get(window.id));
        } else {
          reject(null);
        }
      }
    );
  }

  /**
   * 通过窗口 id 获取窗口实例
   * @param key
   * @returns
   */
  get(key: number) {
    return this.windowMap.get(key);
  }

  /**
   * 通过窗口 id 检测窗口是否存在
   * @param key
   * @returns
   */
  has(key: number) {
    return this.windowMap.has(key);
  }

  /**
   * 通过 /config/WINDOWS.ts 定义的枚举值获取对应的窗口ids
   * @param key
   * @returns
   */
  getIds(key: WINDOWS) {
    return this.windowIdMap.get(key);
  }

  /**
   * 通过 /config/WINDOWS.ts 定义的枚举值检测窗口是否存在
   * @param key
   * @returns
   */
  hasIds(key: WINDOWS) {
    return this.windowIdMap.has(key);
  }
}

export default new WindowManager();
