import { create } from "zustand";

interface ModalConfirmStore {
  data: Record<string, any>;
  isOpenConfirm: boolean;
  isOpenInfo: boolean;
  onOpenConfirm: (data: Record<string, any>) => void;
  onOpenInfo: () => void;
  onCloseConfirm: () => void;
  onCloseInfo: () => void;
}

const useModalConfirm = create<ModalConfirmStore>((set) => ({
  data: {},
  isOpenConfirm: false,
  isOpenInfo: false,
  onOpenConfirm: (data) => set({ isOpenConfirm: true, data }),
  onCloseConfirm: () => set({ isOpenConfirm: false, data: {} }),
  onOpenInfo: () => set({ isOpenInfo: true, data: {} }),
  onCloseInfo: () => set({ isOpenInfo: false, data: {} }),
}));

export default useModalConfirm;
