import type { NewProductRegisterRow } from '../types';
export type NewProductRegisterRes = {
    code: string;
    status: string;
    message: NewProductRegisterRow[];
};
export type NewProductRegisterSaveReq = NewProductRegisterRow[];
export declare const fetchNewProductRegisters: () => Promise<import("@/api/httpClient").ApiResponse<NewProductRegisterRow[]>>;
export declare const saveNewProductRegisters: (dsName: string, payload: NewProductRegisterRow[]) => Promise<import("@/api/httpClient").ApiResponse<NewProductRegisterRow>>;
