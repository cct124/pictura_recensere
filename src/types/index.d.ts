export interface _IpcRenderer {
  send(channel: VALIDCHANNELS, ...args: unknown[]): void;
  on(
    channel: VALIDCHANNELS,
    listener: (...args: unknown[]) => unknown
  ): () => void;
  lisOnce(channel: string, listener: (...args: unknown[]) => unknown): void;
}

declare global {
  interface Window {
    ipcRenderer: _IpcRenderer;
  }
}
