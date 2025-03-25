import { create } from 'zustand'

interface HouseState {
  length: number
  width: number
  height: number
  roof: {
    type: 'gable' | 'hip'
    rafterSpacing: number
    battenSpacing: number
  }
  update: (key: string, value: any) => void
}

export const useHouseStore = create((set) => ({
  house: {
    width: 1000, // в см
    length: 1500,
    height: 300,
  },
  roof: {
    type: 'gable',
    rafterSpacing: 60,
  },
  updateHouse: (newParams: any) =>
    set((state: any) => ({
      house: { ...state.house, ...newParams },
    })),
  updateRoof: (newParams: any) =>
    set((state: any) => ({
      roof: { ...state.roof, ...newParams },
    })),
}))
