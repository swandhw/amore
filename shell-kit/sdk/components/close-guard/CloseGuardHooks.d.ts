type UseCloseGuardOptions = {
    isDirty?: boolean;
    hasChanges?: () => boolean;
};
export declare const useCloseGuardContext: () => import("./CloseGuardContexts").CloseGuardContextValue | null;
export declare const useCloseGuardTabId: () => string | null;
export declare const useCloseGuard: ({ isDirty, hasChanges }: UseCloseGuardOptions) => void;
export {};
