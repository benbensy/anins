import * as window from './window'
import * as searchHistory from './search-history'
import * as extension from './extension'

export const api = {
  ...window,
  ...searchHistory,
  ...extension
}

export type Api = typeof api
