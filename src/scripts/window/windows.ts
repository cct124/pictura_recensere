import WINDOWS from "@/config/WINDOWS";
import { MainWindow } from "@/types/type.d";
import system from "@/scripts/models/system";

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

/**
 * 窗口定义实例
 */
export default new Windows([
  // 主窗口的定义
  [
    WINDOWS.MAIN,
    {
      // 进入首页
      loadURL: "",
      options: {
        width: 1400,
        height: 675,
        // 无框窗口
        frame: false,
        webPreferences: {
          contextIsolation: true,
          //预加载脚本
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
      },
      ready(window) {
        // 最大化窗口事件
        window.on("maximize", () => {
          system.setIsMaximizes(true);
        });
        // 取消最大化窗口事件
        window.on("unmaximize", () => {
          system.setIsMaximizes(false);
        });
        // 窗口失去焦点事件
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

  // 创建画布窗口定义
  [
    WINDOWS.CREATE_CANVAS,
    {
      loadURL: "/#/CreateCanvas",
      options: {
        width: 340,
        height: 400,
        // 模态窗口
        modal: true,
        resizable: false,
        minimizable: false,
        maximizable: false,
        // 窗口是否可以进入全屏模式。
        fullscreenable: false,
        frame: false,
        // 背景透明
        transparent: true,
        title: "新建画布",
        webPreferences: {
          contextIsolation: true,
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
      },
      unique: true,
      dev: {
        devTools: {
          open: true,
          options: {
            mode: "detach",
          },
        },
      },
    },
  ],

  [
    WINDOWS.COLOR_PICKER,
    {
      loadURL: "/#/ColorPicker",
      unique: true,
      options: {
        width: 535,
        height: 402,
        modal: true,
        resizable: false,
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        title: "拾色器",
        webPreferences: {
          contextIsolation: true,
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
      },
      dev: {
        devTools: {
          open: false,
          options: {
            mode: "detach",
          },
        },
      },
    },
  ],
]);
