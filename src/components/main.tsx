import React from 'react';
import IpcRenderer from '@/scripts/ipc/Renderer'
import ipcMain from '@/scripts/ipc/Main'
import { VALIDCHANNELS } from "@/config/ipcChannels";


const ipcRenderer = new IpcRenderer({ ipc: window.ipcRenderer, channel: VALIDCHANNELS.toMain }) as unknown as ipcMain

export function Main() {

  // console.log(ipcRenderer);
  ipcRenderer.getSysteamInfo();

  return <h2 >Hello from React!</h2>
}

