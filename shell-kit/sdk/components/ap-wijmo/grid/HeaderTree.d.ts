import type { HeaderLayout } from './HeaderDefinition';
export type HeaderNode = {
    id: string;
    title: string;
    parent?: HeaderNode;
    children: HeaderNode[];
    binding?: string;
};
export type HeaderColumnInfo = {
    binding: string;
    header: string;
};
export declare const getTreeDepth: (nodes: HeaderNode[]) => number;
export declare const getLeafNodes: (node: HeaderNode) => HeaderNode[];
export declare const getColSpan: (node: HeaderNode) => number;
export declare const getRowSpan: (node: HeaderNode, totalDepth: number, depth: number) => number;
export declare const createHeaderLayoutFromTree: (tree: HeaderNode[], columns: HeaderColumnInfo[]) => HeaderLayout;
export declare const createLeafNode: (id: string, title: string, binding: string) => HeaderNode;
export declare const createGroupNode: (id: string, title: string, children: HeaderNode[]) => HeaderNode;
