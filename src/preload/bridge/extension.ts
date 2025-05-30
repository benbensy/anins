import { ipcRenderer } from 'electron'

export function getExtensionInfo(code: string) {
  return ipcRenderer.invoke('extension:get-info', code)
}
