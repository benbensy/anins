import { ipcRenderer } from 'electron'

export function getKeywords() {
  return ipcRenderer.invoke('search-history:get-keywords')
}

export function addKeyword(keyword: string) {
  return ipcRenderer.invoke('search-history:add-keyword', keyword)
}

export function clearKeywords() {
  return ipcRenderer.invoke('search-history:clear-keywords')
}
