import type { StateCreator } from 'zustand'

export interface AppSlice {
  version: string
}

export const createAppSlice: StateCreator<AppSlice> = () => ({
  version: window.electron.process.versions.electron ?? ''
})
