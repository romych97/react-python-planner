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
    width: 1000, // in cm
    length: 1500,
    height: 300,
    wallThickness: 22,
    doors: [{ x: 100, y: 250 }],
    windows: [{ x: 150, y: 50 }],
  },
  roof: {
    type: 'gable',
    rafterSpacing: 60,
    overhang: 40,
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
