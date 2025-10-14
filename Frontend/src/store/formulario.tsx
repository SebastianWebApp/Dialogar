import { create } from "zustand";

// Es como utilizar useState pero a nivel global

export type FormularioState = {
  name: string;
  phone: string;
  password: string;
  image: File | null;
  new_account: boolean;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setImage: (image: File | null) => void;
  setNewAccount: (new_account: boolean) => void;
};

export const useFormularioStore = create<FormularioState>((set) => ({
  name: "",
  phone: "",
  password: "",
  image: null,
  new_account: true,
  setNewAccount: (new_account) => set({ new_account }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setPassword: (password) => set({ password }),
  setImage: (image) => set({ image }),
}));
