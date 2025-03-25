import { create } from "zustand";

interface CalculatorState {
  result: number | null;
  calculate: (length: number, width: number) => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  result: null,
  calculate: (length, width) => set({ result: length * width }),
}));
