export type BadCodeRegisterRow = {
    productCategory: string;
    badCodeCategory: string;
    badCode: string;
    badCodeName: string;
    useStatus: string;
    remark: string;
};
export type BadCodeRegisterSearchParams = {
    codeType?: string | null;
    useStatus?: string | null;
};
export type DsCombo1 = {
    codeKorNameRe: string;
    commCode: string;
};
export type DsSearchListResult14Row = {
    codeKorName: string;
    commCode: string;
};
export type DsSearchListResult535Row = {
    codeKorName: string;
    commCode: string;
};
