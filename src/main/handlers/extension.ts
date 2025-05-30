import { ipcMain } from 'electron'
import { getExtensionInfo } from '../extension'

export function registerExtensionHandlers() {
  ipcMain.handle('extension:get-info', async (_, code: string) => {
    return getExtensionInfo(code)
  })
}
