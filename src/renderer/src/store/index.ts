import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { appSlice } from './app-slice'
import { searchSlice } from './search-slice'
import { withSlices } from 'zustand-slices'

export const useBoundStore = create(immer(withSlices(appSlice, searchSlice)))
