import { create } from "zustand";

interface InputSelect {
  value: Record<string, any>;
  setValue: (value: Record<string, any>) => void;
}

const useInputSelect = create<InputSelect>((set) => ({
  value: {},
  setValue: (value) => set({ value }),
}));

export default useInputSelect;
