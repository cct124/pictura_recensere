/* eslint-disable @typescript-eslint/no-unused-vars */
export interface _IpcRenderer {
  send(channel: VALIDCHANNELS, ...args: unknown[]): void;
  on(
    channel: VALIDCHANNELS,
    listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => unknown
  ): () => void;
  lisSend(channel: string, ...args: unknown[]): void;
  lisOnce(
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => unknown
  ): void;
}

export namespace MainWindow {
  /**
   * 开发环境相关配置
   */
  interface DevConfig {
    hash?: string;
    devTools?: {
      open?: boolean;
      options?: Electron.OpenDevToolsOptions;
    };
    reload?: boolean;
  }

  /**
   * 窗口配置
   */
  interface WindowConfig {
    /**
     * 窗口加载的 URL
     */
    loadURL: string;
    /**
     * 窗口配置
     */
    options: Electron.BrowserWindowConstructorOptions;
    /**
     * 只能存在一个这种类型的窗口
     */
    unique?: boolean;
    /**
     * 开发环境相关配置
     */
    dev?: DevConfig;
    /**
     * 窗口创建后执行此函数
     */
    ready?: (window: Electron.BrowserWindow) => void;
  }

  interface WindowMapValue {
    /**
     * 窗口枚举类型
     */
    type: WINDOWS;
    /**
     * window 实例
     */
    window: Electron.BrowserWindow;
  }
}

export namespace WindowManager {
  interface options {
    query?: {
      [key: string]: unknown;
    };
    options?: Electron.BrowserWindowConstructorOptions;
  }
}

declare global {
  interface Window {
    ipcRenderer: _IpcRenderer;
  }

  interface ObjKey {
    [key: string]: unknown;
  }

  namespace NodeJS {
    interface Process {
      development: boolean;
    }
  }
}

/**
 * Menubar
 */
export interface MenubarItem {
  title?: string;
  type?: "separator";
  onClick?: () => unknown;
  children?: MenubarItem[];
}
