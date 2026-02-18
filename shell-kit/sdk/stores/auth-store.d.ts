import type { Role } from '@/constants/roles';
export type AuthUser = {
    id: string;
    name: string;
};
type AuthState = {
    accessToken: string | null;
    roles: Role[];
    user: AuthUser | null;
    isAuthenticated: boolean;
    setAccessToken: (accessToken: string | null) => void;
    setUser: (user: AuthUser, roles: Role[]) => void;
    reset: () => void;
};
export declare const useAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AuthState>>;
export {};
