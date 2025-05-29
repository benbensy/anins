import Store from 'electron-store'

import { STATE_DATA_DIR } from './constants/app'

export interface WindowState {
  width: number
  height: number
  x?: number
  y?: number
  isMaximized: boolean
}

export interface SearchHistory {
  keywords: string[]
}

export const store = new Store<{ windowState: WindowState; searchHistory: SearchHistory }>({
  cwd: STATE_DATA_DIR,
  defaults: {
    windowState: {
      width: 1280,
      height: 720,
      isMaximized: false
    },
    searchHistory: {
      keywords: []
    }
  }
})
