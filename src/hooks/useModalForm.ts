import { create } from "zustand";

interface ModalFormStore {
  isOpen: boolean;
  data: Record<string, any>;
  onOpen: (data?: Record<string, any>) => void;
  onClose: () => void;
}

const useModalForm = create<ModalFormStore>((set) => ({
  data: {},
  isOpen: false,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: {} }),
}));

export default useModalForm;
