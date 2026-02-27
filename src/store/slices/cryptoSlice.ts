import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CryptoState {
  selectedAsset: string
  selectedDays: number
  page: number
}

const initialState: CryptoState = {
  selectedAsset: localStorage.getItem('selectedAsset') || 'bitcoin',
  selectedDays: 7,
  page: 1
}

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedAsset: (state, action: PayloadAction<string>) => {
      state.selectedAsset = action.payload
      localStorage.setItem('selectedAsset', action.payload)
    },
    setSelectedDays: (state, action: PayloadAction<number>) => {
      state.selectedDays = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  }
})

export const { setSelectedAsset, setSelectedDays, setPage } = cryptoSlice.actions
export default cryptoSlice.reducer