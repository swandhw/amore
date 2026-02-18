import type { HTMLAttributes } from 'react';
type ViewFillProps = HTMLAttributes<HTMLDivElement> & {
    variant?: 'root' | 'body' | 'scroll';
};
export declare const ViewFill: ({ variant, className, ...props }: ViewFillProps) => import("react/jsx-runtime").JSX.Element;
export {};
