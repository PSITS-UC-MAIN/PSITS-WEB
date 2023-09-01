import { create } from "zustand";
const useStore = create((set) => ({
    authUser: null,
    requestLoading: false,
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
}));
export default useStore;
