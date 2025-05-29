import { createSlice } from 'zustand-slices'

export const appSlice = createSlice({
  name: 'app',
  value: {
    version: window.electron.process.versions.electron ?? ''
  },
  actions: {}
})
