import { create } from "zustand";

interface Register {
  _id: string;
  avatar: any;
  userId: string;
  rfid: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
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
