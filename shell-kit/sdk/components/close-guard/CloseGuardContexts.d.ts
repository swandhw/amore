type CloseGuardChecker = () => boolean;
export type CloseGuardContextValue = {
    registerChecker: (tabId: string, checker: CloseGuardChecker) => () => void;
    setTabDirty: (tabId: string, isDirty: boolean) => void;
    isTabDirty: (tabId: string) => boolean;
    attemptClose: (tabId: string, onConfirm: () => void) => void;
    attemptSwitch: (tabId: string, onConfirm: () => void) => void;
    attemptSearch: (tabId: string, onConfirm: () => void) => void;
    reEvaluateTabDirty: (tabId: string) => void;
};
export declare const CloseGuardContext: import("react").Context<CloseGuardContextValue | null>;
export declare const CloseGuardTabContext: import("react").Context<string | null>;
export type { CloseGuardChecker };
