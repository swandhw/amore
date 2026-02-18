import * as React from "react";
export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
};
export declare const Tabs: ({ className, defaultValue, value, onValueChange, ...props }: TabsProps) => import("react/jsx-runtime").JSX.Element;
export declare const TabsList: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
};
export declare const TabsTrigger: ({ className, value, ...props }: TabsTriggerProps) => import("react/jsx-runtime").JSX.Element;
export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    keepMounted?: boolean;
};
export declare const TabsContent: ({ className, value, keepMounted, ...props }: TabsContentProps) => import("react/jsx-runtime").JSX.Element | null;
