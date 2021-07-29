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

declare global {
  interface Window {
    ipcRenderer: _IpcRenderer;
  }
}
