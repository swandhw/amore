import { type FlexGrid } from '@mescius/wijmo.grid';
import type { GridRowBase } from './GridTypes';
type GridRow<T> = T & GridRowBase;
export declare class GridAdapter<TApi> {
    private grid;
    private rows;
    private snapshot;
    attach(grid: FlexGrid): void;
    init(rows: TApi[]): void;
    getCurrentRows(): GridRow<TApi>[];
    getSnapshotRows(): GridRow<TApi>[];
    appendRow(row: TApi): void;
    markUpdated(rowId: string, areRowsEqual?: (current: GridRow<TApi>, snapshot: GridRow<TApi>) => boolean): void;
    stripMeta(row: GridRow<TApi>, extraKeys?: Array<keyof TApi>): TApi;
    normalizeRow(row: GridRow<TApi>, extraKeys?: Array<keyof TApi>): string;
    markDeleted(rowId: string): void;
    resetSnapshot(): void;
    hasChanges(): boolean;
}
export {};
