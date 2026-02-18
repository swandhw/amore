type Role = 'ROLE_ADMIN' | 'ROLE_MANAGER' | 'ROLE_USER';
type PageDefinition = {
    id: string;
    name: string;
    path: string;
    requiredRoles: Role[];
    domainId: string;
    lv1Name: string;
};
type DomainDefinition = {
    id: string;
    name: string;
};
export declare const DOMAIN_DEFINITIONS: DomainDefinition[];
export declare const PAGE_DEFINITIONS: PageDefinition[];
export declare const commonHandlers: import("msw").HttpHandler[];
export {};
