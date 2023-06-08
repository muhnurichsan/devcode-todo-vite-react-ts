import { create } from "zustand";

interface SortDataStore {
  data: Record<string, any>[];
  onSort: (data: Record<string, any>[]) => void;
}

const useSortData = create<SortDataStore>((set) => ({
  data: [],
  onSort: (data: Record<string, any>[]) => set({ data }),
}));

export default useSortData;
