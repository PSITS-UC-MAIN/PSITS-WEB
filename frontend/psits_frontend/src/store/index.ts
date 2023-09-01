import { create } from "zustand";

interface Register {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: string;
  course: string;
  year: string;
}
type Store = {
  authUser: Register | null;
  requestLoading: boolean;
  setAuthUser: (user: Register | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useStore;
