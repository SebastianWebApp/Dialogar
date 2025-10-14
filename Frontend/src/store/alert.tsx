import { create } from "zustand";

// Es como utilizar useState pero a nivel global

export type AlertState = {
  message: string;
  setMessage: (message: string) => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  message: "",
  setMessage: (message) => set({ message }),
}));
