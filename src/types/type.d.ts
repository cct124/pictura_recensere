/* eslint-disable @typescript-eslint/no-unused-vars */
import { VALIDCHANNELS } from "@/config/VALIDCHANNELS";
import { LayerType } from "@/plugin/canvas/layerConctrol";
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

export interface CreateCanvasInfo {
  title: string;
  width: number;
  height: number;
  unit: string;
  color: string;
}

export interface WorkAreaType extends CreateCanvasInfo {
  id: number;
  title: string;
  active: boolean;
}

export namespace Layer {
  /**
   * 背景图层
   */
  interface BackgroundLayer {
    color: string;
  }

  interface ImageLayer {
    name: string;
    type: string;
    path: string;
    size: number;
    blob: Blob;
  }

  /**
   * 文本图层
   */
  interface TextLayer {
    /**
     * 填充或描边文本
     */
    draw: "fill" | "stroke";
    /**
     * 文本内容
     */
    text: string;
    size: number;
    color: string;
    translateX: number;
    translateY: number;
    width: number;
    height: number;
    style: string;
    weight: number | string;
    variant: string;
    align: "start" | "end" | "left" | "right" | "center";
    baseline:
      | "top"
      | " hanging"
      | " middle"
      | " alphabetic"
      | " ideographic"
      | " bottom";
    direction: "ltr" | "rtl" | "inherit";
  }

  interface LayerMeta {
    name: string;
    index: number;
    type: LayerType;
    active: boolean;
    meta: BackgroundLayer | TextLayer | ImageLayer;
    visibility: boolean;
  }
}

export namespace WorkAreas {
  interface Layer {
    id: number;
    name: string;
    type: LayerType;
    active: boolean;
    visibility: boolean;
  }

  namespace RenderStack {
    interface Rect {
      x: number;
      y: number;
      w: number;
      h: number;
    }
    /**
     * 文本
     */
    interface Text {
      id: number;
      /**
       * 填充或描边文本
       */
      draw: "fill" | "stroke";
      /**
       * 文本内容
       */
      text: string;
      size: number;
      color: string;
      translateX: number;
      translateY: number;
      width: number;
      height: number;
      style: string;
      weight: number | string;
      variant: string;
      align: "start" | "end" | "left" | "right" | "center";
      baseline:
        | "top"
        | " hanging"
        | " middle"
        | " alphabetic"
        | " ideographic"
        | " bottom";
      direction: "ltr" | "rtl" | "inherit";
    }
  }
}
