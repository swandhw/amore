import type { GridColumnDef } from './GridTypes';
export type HeaderCell = {
    row: number;
    col: number;
    rowspan: number;
    colspan: number;
    label: string;
};
export type HeaderLayout = {
    rows: number;
    cols: number;
    cells: HeaderCell[];
};
export declare const createUniformHeaderLayout: (labels: string[], rows: number) => HeaderLayout;
export type NexacroHeadCellInput = {
    row?: number;
    col: number;
    rowspan?: number;
    colspan?: number;
    label: string;
};
export declare const createHeaderLayoutFromNexacro: (labels: string[], rows: number, headCells: NexacroHeadCellInput[]) => HeaderLayout;
export type NexacroGridConfig<T> = {
    columns: GridColumnDef<T>[];
    headerLayout: HeaderLayout;
};
export declare const createNexacroGridConfig: <T>(columns: GridColumnDef<T>[], rows: number, headCells: NexacroHeadCellInput[]) => NexacroGridConfig<T>;
