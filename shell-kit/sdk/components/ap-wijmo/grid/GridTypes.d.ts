export type GridRowBase = {
    _rowId: string;
    _op?: 'C' | 'U' | 'D';
    _dirty?: boolean;
};
type GridDataTypeMap<T> = T extends string ? 'String' : T extends number ? 'Number' : T extends boolean ? 'Boolean' : T extends Date ? 'Date' : never;
export type GridColumnDef<T, K extends keyof T = keyof T> = {
    binding: keyof T;
    header: string;
    width: number | '*';
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    isReadOnly?: boolean;
    format?: string;
    dataType: GridDataTypeMap<T[K]>;
    dataMap?: any;
    isRequired?: boolean;
};
export type GridInitOptions<TApi> = {
    columns: GridColumnDef<TApi>[];
    rows: TApi[];
};
export {};
