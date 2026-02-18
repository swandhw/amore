declare const rawPageDictionary: {
    BASIC_INFO_OVERVIEW: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    BAD_CODE_REGISTER: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    NEW_PRODUCT_REGISTER: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    D_PMASM_PROCESS: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    BASIC_INFO_FORM_TEMPLATE: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    HOME: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    LOGIN: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    FORBIDDEN: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    PRODUCTION_INFO_OVERVIEW: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
    PACKAGING_INFO_OVERVIEW: {
        path: string;
        sourcePath: string;
        requireAuth: boolean;
    };
};
import type { ReactElement } from 'react';
import type { Role } from '@/constants/roles';
export type PageKey = keyof typeof rawPageDictionary;
export type PageDefinition = {
    path: string;
    sourcePath: string;
    requireAuth?: boolean;
    requiredRoles?: Role[];
};
export type AppRoute = {
    path: string;
    element: ReactElement;
    requiresAuth?: boolean;
    requiredRoles?: Role[];
};
export declare const PAGE_DEFINITIONS: Record<PageKey, PageDefinition>;
export declare const LOCAL_APP_ROUTES: AppRoute[];
export type ServerPageDefinition = {
    id: string;
    name: string;
    path: string;
    requiredRoles: Role[];
};
export declare const mapServerPagesToAppRoutes: (serverPages: ServerPageDefinition[]) => AppRoute[];
export declare const mergeRoutesWithServerPages: (localRoutes: AppRoute[], serverPages: ServerPageDefinition[]) => AppRoute[];
export {};
