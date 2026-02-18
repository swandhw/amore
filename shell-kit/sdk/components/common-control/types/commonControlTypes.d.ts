import type { PageCrudAuthType } from "@/hooks/usePageCrudAuthCheck";
export type CommonButtonResultType = {
    result: true;
    message?: string;
} | {
    result: false;
    message: string;
};
export type CommonButtonsProps = {
    title: string;
    can: (type: PageCrudAuthType) => boolean;
    actions: {
        createCommand: () => void;
        deleteCommand: () => void;
        searchCommand: () => Promise<CommonButtonResultType>;
        commitCommand: () => Promise<CommonButtonResultType>;
        excelCommand: () => Promise<CommonButtonResultType>;
    };
};
