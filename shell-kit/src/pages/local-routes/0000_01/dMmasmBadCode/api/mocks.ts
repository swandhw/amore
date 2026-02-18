import { http, HttpResponse } from 'msw';
import type {
  DMmasmBadCodeRow,
  DsCombo1,
  DsCombo2,
  DsSearchListResult14Row,
  DsSearchListResult535Row,
} from '../types/DMmasmBadCodeTypes';

const D_MMASM_BAD_CODE_ROWS: DMmasmBadCodeRow[] = [];
const D_MMASM_BAD_CODE_OPTION_535: DsSearchListResult535Row[] = [];
const D_MMASM_BAD_CODE_OPTION_14: DsSearchListResult14Row[] = [
  { codeKorName: 'Yes', commCode: 'Y' },
  { codeKorName: 'No', commCode: 'N' },
];
const D_MMASM_BAD_CODE_OPTION_COMBO_1: DsCombo1[] = [];
const D_MMASM_BAD_CODE_OPTION_COMBO_2: DsCombo2[] = [];

export const getDMmasmBadCodesByFindMock = http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code', async () => {
  return HttpResponse.json({
    result: 'true',
    message: 'OK',
    responseBody: D_MMASM_BAD_CODE_ROWS,
  });
});

export const postDMmasmBadCodesByMultiMock = http.post('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/commands/save', async ({ request }) => {
  const payload = await request.json();
  return HttpResponse.json({
    result: 'true',
    message: 'OK',
    responseBody: payload,
  });
});

export const getDsSearchListResult535RowMock = http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/searchlistresult535-row', () => HttpResponse.json({
  result: 'true',
  message: 'OK',
  responseBody: D_MMASM_BAD_CODE_OPTION_535,
}));

export const getDsSearchListResult14RowMock = http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/searchlistresult14-row', () => HttpResponse.json({
  result: 'true',
  message: 'OK',
  responseBody: D_MMASM_BAD_CODE_OPTION_14,
}));

export const getDsCombo1Mock = http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/combo1', () => HttpResponse.json({
  result: 'true',
  message: 'OK',
  responseBody: D_MMASM_BAD_CODE_OPTION_COMBO_1,
}));

export const getDsCombo2Mock = http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/combo2', () => HttpResponse.json({
  result: 'true',
  message: 'OK',
  responseBody: D_MMASM_BAD_CODE_OPTION_COMBO_2,
}));

export const dMmasmBadCodeHandlers = [
  getDMmasmBadCodesByFindMock,
  getDsSearchListResult535RowMock,
  getDsSearchListResult14RowMock,
  getDsCombo1Mock,
  getDsCombo2Mock,
];

export const dMmasmBadCodeMutationHandlers = [postDMmasmBadCodesByMultiMock];
