import { FlexGrid, type CellRangeEventArgs } from '@mescius/wijmo.grid';
import type { ApiResponse } from '@/api/httpClient';
import type { CommonButtonResultType } from '@/components/common-control/types/commonControlTypes';
import type { GridColumnDef } from '@/components/ap-wijmo/grid/GridTypes';
type IntegrityValidator<T> = (createdRows: T[], updatedRows: T[]) => CommonButtonResultType | void | Promise<CommonButtonResultType | void>;
type CreateRowResult<T> = {
    result: true;
    row: T;
} | {
    result: false;
    message: string;
};
type UseGridOptions<T> = {
    columns: GridColumnDef<T>[];
    gridName: string;
    pageName: string;
    onValidateRowDelete?: (grid: FlexGrid, row: T) => Promise<CommonButtonResultType> | CommonButtonResultType;
    onValidateIntegrity?: IntegrityValidator<T>;
    onBeforeCreate?: (grid: FlexGrid, newRow: T, currentSelectedRow?: T) => Promise<CreateRowResult<T>> | CreateRowResult<T>;
    onSelectionChanged?: (grid: FlexGrid) => void;
    onCellEditEnded?: (grid: FlexGrid) => void;
    onPasted?: (grid: FlexGrid, e: CellRangeEventArgs) => void;
    enableCloseGuard?: boolean;
    enableSearchGuard?: boolean;
};
export declare const useGrid: <T, TSearchParams = void>(createEmptyRow: () => T, fetchApi: (params?: TSearchParams) => Promise<ApiResponse<T[]>>, saveApi: (dsName: string, payload: T[]) => Promise<ApiResponse<T>>, options: UseGridOptions<T>) => {
    snapshotRows: T[];
    isDirty: boolean;
    hasChanges: () => boolean;
    handleSearch: (params?: TSearchParams) => Promise<CommonButtonResultType>;
    handleCreate: (newRow?: T) => Promise<void>;
    handleDelete: () => Promise<void>;
    handleCommit: () => Promise<CommonButtonResultType>;
    handleExcel: () => Promise<CommonButtonResultType>;
    handleGridInitialized: (grid: FlexGrid) => void;
};
export {};
