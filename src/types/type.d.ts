/* eslint-disable @typescript-eslint/no-unused-vars */
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";

export interface _IpcRenderer {
  /**
   * 发送IPC消息
   *
   * 必须在 `VALIDCHANNELS` 注册过的 channel 才有效
   * @param channel
   * @param args
   */
  send(channel: VALIDCHANNELS, ...args: unknown[]): void;
  /**
   * 监听IPC消息
   *
   * 必须在 `VALIDCHANNELS` 注册过的 channel 才有效
   * @param channel
   * @param listener
   */
  on(
    channel: VALIDCHANNELS,
    listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => unknown
  ): () => void;

  /**
   * 发送IPC消息
   * @param channel 
   * @param args 
   */
  lisSend(channel: string, ...args: unknown[]): void;
  
  /**
   * 监听IPC消息，消息只监听一次
   * @param channel 
   * @param listener 
   */
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
    /**
     * chrome devTools 的配置
     */
    devTools?: {
      /**
       * 是否在创建窗口完成时打开控制台
       */
      open?: boolean;
      /**
       * 控制台配置
       */
      options?: Electron.OpenDevToolsOptions;
    };
    /**
     * 开启 F5 刷新页面
     */
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
    /**
     * ipc 通信对象
     */
    ipcRenderer: _IpcRenderer;
  }

  interface ObjKey {
    [key: string]: unknown;
  }

  namespace NodeJS {
    interface Process {
      /**
       * 是否为开发环境
       */
      development: boolean;
    }
  }
}

/**
 * Menubar
 */
export interface MenubarItem {
  /**
   * 菜单名称
   */
  title?: string;
  /**
   * 类型 设置为 separator 时为一条分割线
   */
  type?: "separator";
  /**
   * 点击时调用的函数
   */
  onClick?: () => unknown;
  /**
   * 子级菜单 目前只支持二级
   */
  children?: MenubarItem[];
}
