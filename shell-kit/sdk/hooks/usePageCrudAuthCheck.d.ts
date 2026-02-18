export type PageCrudAuthType = 'SEARCH' | 'CREATE' | 'UPDATE' | 'DELETE' | 'EXCEL' | 'PRINT';
export type PageCrudAuth = Record<PageCrudAuthType, boolean>;
export declare const usePageCrudAuth: (oldPageName: string) => {
    auth: PageCrudAuth | undefined;
    can: (type: PageCrudAuthType) => boolean;
};
