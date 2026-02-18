import { type AxiosInstance } from 'axios';
declare const httpClient: AxiosInstance;
export type ApiResponse<T> = {
    result: 'true' | 'false';
    message: string;
    responseBody?: T;
};
export declare function apiGet<T, TFilter = undefined>(url: string, filter?: Partial<TFilter>): Promise<ApiResponse<T>>;
export declare function apiPost<T>(url: string, dsName: string, payload: T[]): Promise<ApiResponse<T>>;
export default httpClient;
