import * as wjGrid from '@mescius/wijmo.grid';
import type { HeaderNode } from './HeaderTree';
type HeaderTreeDragOptions = {
    tree: HeaderNode[];
    allowDragging?: boolean;
};
export declare const attachHeaderTreeDrag: (grid: wjGrid.FlexGrid, options: HeaderTreeDragOptions) => void;
export {};
