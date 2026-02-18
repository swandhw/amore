import * as React from "react";
type Direction = "horizontal" | "vertical";
export type ResizableSplitViewProps = {
    direction?: Direction;
    size?: number;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    onSizeChange?: (size: number) => void;
    className?: string;
    primary: React.ReactNode;
    secondary: React.ReactNode;
};
export declare const ResizableSplitView: ({ direction, size, defaultSize, minSize, maxSize, onSizeChange, className, primary, secondary, }: ResizableSplitViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
