import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { Qcdvm10NewitemRow } from '../types/Qcdvm10NewitemTypes';
import type { ApiResponse } from '@/api/httpClient';

const QCDVM_10_NEWITEM_DATA: Qcdvm10NewitemRow[] = [
];

export const fetchQcdvm10Newitems = async () => {
  const filtered = QCDVM_10_NEWITEM_DATA;

  const response: ApiResponse<Qcdvm10NewitemRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveQcdvm10Newitems = async (dsName: string, payload: Qcdvm10NewitemRow[]) =>
  apiPost<Qcdvm10NewitemRow>('/qcdvm-10-newitem', dsName, payload);

