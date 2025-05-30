/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BuiltInFetchers {
  search: (query: string) => Promise<any>
}

export interface Fetchers extends BuiltInFetchers {
  [key: string]: (...args: any[]) => Promise<any>
}

export interface Extension {
  name: string
  id: string
  version: string
  url: string
  author: string
  fetchers: Fetchers
}
