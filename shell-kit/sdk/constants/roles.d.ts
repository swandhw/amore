export declare const ROLE_ADMIN = "ROLE_ADMIN";
export declare const ROLE_MANAGER = "ROLE_MANAGER";
export declare const ROLE_USER = "ROLE_USER";
export declare const ALL_ROLES: readonly ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"];
export type Role = (typeof ALL_ROLES)[number];
