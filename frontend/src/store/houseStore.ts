import { create } from 'zustand'

interface Wall {
  x1: number
  y1: number
  x2: number
  y2: number
}
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

interface Room {
  points: number[][] // Массив точек для полигона комнаты
}

interface HouseState {
  walls: Wall[]
  rooms: Room[]
  mode: 'walls' | 'default'
  addWall: (wall: Wall) => void
  addRoom: (points: number[][]) => void
  setMode: (mode: 'walls' | 'default') => void
}

export const useHouseStore = create((set) => ({
  house: {
    width: 1000,
    length: 1500,
    height: 300,
    wallThickness: 30,
  },
  roof: {
    type: 'gable',
    rafterSpacing: 60,
  },
  mode: null,
  rooms: [],
  walls: [],
  setMode: (mode: any) => set({ mode }),
  addWall: (wall: any) =>
    set((state: any) => ({ walls: [...state.walls, wall] })),
  addRoom: (points: any) =>
    set((state: any) => ({
      rooms: [...state.rooms, { points }],
    })),
  updateHouse: (newParams: any) =>
    set((state: any) => ({
      house: { ...state.house, ...newParams },
    })),
}))
