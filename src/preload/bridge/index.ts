import * as window from './window'
import * as searchHistory from './search-history'

export const api = {
  ...window,
  ...searchHistory
}

export type Api = typeof api
