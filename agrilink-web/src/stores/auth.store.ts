// Lightweight placeholder for the auth store used only for static type-checking and recovery.
// This intentionally avoids depending on zustand at runtime for these diagnostics.

type User = { name?: string; barangay?: string; role?: string } | null;

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

// Minimal, permissive placeholder hook — returns selected slice or full state.
export const useAuthStore = ((selector?: any) => {
  const state: AuthState = {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    setUser: () => {},
  };
  return selector ? selector(state) : state;
}) as any;

export default useAuthStore;
