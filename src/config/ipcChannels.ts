/**
 * whitelist channels
 * 有效的ipc频道
 */
export enum VALIDCHANNELS {
  /**
   * 向主进程发送消息
   */
  toMain = "toMain",
  /**
   * 来自主进程的消息
   */
  fromMain = "fromMain",
}
