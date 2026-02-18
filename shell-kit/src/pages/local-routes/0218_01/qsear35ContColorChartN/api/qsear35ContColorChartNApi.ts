import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { Qsear35ContColorChartNRow } from '../types/Qsear35ContColorChartNTypes';
import type { ApiResponse } from '@/api/httpClient';

const QSEAR_35_CONT_COLOR_CHART_N_DATA: Qsear35ContColorChartNRow[] = [
];

export const fetchQsear35ContColorChartNs = async () => {
  const filtered = QSEAR_35_CONT_COLOR_CHART_N_DATA;

  const response: ApiResponse<Qsear35ContColorChartNRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveQsear35ContColorChartNs = async (dsName: string, payload: Qsear35ContColorChartNRow[]) =>
  apiPost<Qsear35ContColorChartNRow>('/qsear-35-cont-color-chart-n', dsName, payload);

export const fetchQsear35ContColorChartNGrid02 = async () => {
  const response: ApiResponse<Qsear35ContColorChartNRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchQsear35ContColorChartNGrid03 = async () => {
  const response: ApiResponse<Qsear35ContColorChartNRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

