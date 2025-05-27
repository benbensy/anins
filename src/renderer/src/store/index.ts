import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware/persist'
import { createAppSlice, type AppSlice } from './app-slice'

export type Store = AppSlice

export const useBoundStore = create<Store>()(
  persist(
    immer((...a) => ({
      ...createAppSlice(...a)
    })),
    {
      name: 'zustand',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
