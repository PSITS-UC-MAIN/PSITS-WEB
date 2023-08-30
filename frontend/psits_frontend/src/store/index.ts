import { create } from "zustand";

import { RegisterSchema } from "@/pages/Register";

type Store = {
  authUser: RegisterSchema | null;
  requestLoading: boolean;
  setAuthUser: (user: RegisterSchema | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useStore;
