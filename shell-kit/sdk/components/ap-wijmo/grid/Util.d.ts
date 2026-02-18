import { DataMap, FlexGrid } from "@mescius/wijmo.grid";
type StringKeyOf<T> = Extract<keyof T, string>;
export declare const createDataMap: <T>(rows: T[], colKey: StringKeyOf<T>, colVal: StringKeyOf<T>) => DataMap<any, any, any>;
export declare const GRID_HEADER_HEIGHT: {
    readonly BIG: 48;
    readonly HUGE: 64;
};
export type GridHeaderHeight = typeof GRID_HEADER_HEIGHT[keyof typeof GRID_HEADER_HEIGHT];
export declare const setGridHeaderHeight: (grid: FlexGrid, height: GridHeaderHeight) => void;
export {};
