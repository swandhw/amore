type Role = 'ROLE_ADMIN' | 'ROLE_MANAGER' | 'ROLE_USER';
type AuthUser = {
    id: string;
    name: string;
    roles: Role[];
};
export declare const AUTH_USERS: AuthUser[];
export declare const authHandlers: import("msw").HttpHandler[];
export {};
