import { create } from "zustand";

interface ModalAddStore {
  isOpen: boolean;
  data: Record<string, any>;
  onOpen: (data?: Record<string, any>) => void;
  onClose: () => void;
}

const useModalAdd = create<ModalAddStore>((set) => ({
  data: {},
  isOpen: false,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalAdd;
