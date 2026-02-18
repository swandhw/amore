import type { Role } from '@/constants/roles';
export type LoginReq = {
    userId: string;
    password: string;
};
export type LoginRes = {
    accessToken: string;
    user: {
        id: string;
        name: string;
        roles: Role[];
    };
    roles: Role[];
};
export type RefreshRes = {
    accessToken: string;
    user: {
        id: string;
        name: string;
    };
    roles: Role[];
};
export declare const login: (body: LoginReq) => Promise<LoginRes>;
export declare const refreshSession: () => Promise<RefreshRes>;
export declare const logout: () => Promise<{
    success: boolean;
}>;
