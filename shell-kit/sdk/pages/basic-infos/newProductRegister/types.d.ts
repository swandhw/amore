export declare const NEW_PRODUCT_ROW_STATUS: {
    readonly NONE: "";
    readonly NEW: "신규";
    readonly UPDATED: "수정";
    readonly DELETED: "삭제";
};
export type NewProductRowStatus = typeof NEW_PRODUCT_ROW_STATUS[keyof typeof NEW_PRODUCT_ROW_STATUS];
export type NewProductRegisterRow = {
    rowStatus: NewProductRowStatus;
    productCode: string;
    productName: string;
    categoryName: string;
    price: number;
    useStatus: string;
    remark: string;
};
