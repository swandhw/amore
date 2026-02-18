export declare const fetchCrudAuth: (_: string) => Promise<{
    SEARCH: boolean;
    CREATE: boolean;
    UPDATE: boolean;
    DELETE: boolean;
    EXCEL: boolean;
    PRINT: boolean;
}>;
