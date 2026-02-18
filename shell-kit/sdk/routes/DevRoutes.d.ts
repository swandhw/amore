import type { AppRoute } from './Routes';
export declare const LOCAL_DEV_DOMAIN_ID = "__LOCAL_DEV__";
export type LocalDevServerPageDefinition = {
    id: string;
    name: string;
    path: string;
    requiredRoles: [];
};
export declare const DEV_LOCAL_APP_ROUTES: AppRoute[];
export declare const DEV_LOCAL_SERVER_PAGES: LocalDevServerPageDefinition[];
