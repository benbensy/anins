/// <reference types="vite/client" />
import { Api } from '../../preload/bridge'

export {}

declare module 'react' {
  interface CSSProperties {
    appRegion?: 'drag' | 'no-drag'
  }
}

declare global {
  interface Window {
    api: Api
  }
}
