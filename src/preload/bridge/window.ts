import { ipcRenderer } from 'electron'

export function closeWindow() {
  return ipcRenderer.invoke('window:close')
}

export function toggleMaximizeWindow() {
  return ipcRenderer.invoke('window:toggle-maximize')
}

export function minimizeWindow() {
  return ipcRenderer.invoke('window:minimize')
}
