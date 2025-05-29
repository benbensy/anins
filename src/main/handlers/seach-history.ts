import { ipcMain } from 'electron'
import { store } from '../store'

export function registerSearchHistoryHandlers() {
  ipcMain.handle('search-history:get-keywords', () => {
    return store.get('searchHistory').keywords
  })

  ipcMain.handle('search-history:add-keyword', (_, keyword: string) => {
    const keywords = store.get('searchHistory').keywords

    store.set('searchHistory', {
      keywords: [...new Set([...keywords, keyword])]
    })
  })

  ipcMain.handle('search-history:clear-keywords', () => {
    store.set('searchHistory', {
      keywords: []
    })
  })
}
