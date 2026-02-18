import type { BadCodeRegisterRow, BadCodeRegisterSearchParams, DsCombo1, DsSearchListResult14Row, DsSearchListResult535Row } from '../types/BadCodeRegisterTypes';
import type { ApiResponse } from '@/api/httpClient';
export declare const fetchBadCodeRegisters: (params?: BadCodeRegisterSearchParams) => Promise<ApiResponse<BadCodeRegisterRow[]>>;
export declare const saveBadCodeRegisters: (dsName: string, payload: BadCodeRegisterRow[]) => Promise<ApiResponse<BadCodeRegisterRow>>;
export declare const fetchDsSearchListResult535Row: () => Promise<ApiResponse<DsSearchListResult535Row[]>>;
export declare const fetchDsSearchListResult14Row: () => Promise<ApiResponse<DsSearchListResult14Row[]>>;
export declare const fetchDsCombo1: () => Promise<ApiResponse<DsCombo1[]>>;
