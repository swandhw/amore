import { http, HttpResponse } from 'msw';

// --- Data: Basic Info ---
const DPMASM_PLANT_OPTIONS = [
  { codeKorName: '서울', commCode: 'PL01' },
  { codeKorName: '인천', commCode: 'PL02' },
];

const DPMASM_PRD_CI_OPTIONS = [
  { codeKorName: '스킨케어', codeKorNameRe: 'Skin', commCode: 'SC' },
  { codeKorName: '메이크업', codeKorNameRe: 'Makeup', commCode: 'MK' },
];

const DPMASM_PROC_TYPE_OPTIONS = [
  { codeKorName: '혼합', commCode: 'MIX' },
  { codeKorName: '충전', commCode: 'FILL' },
  { codeKorName: '포장', commCode: 'PACK' },
];

const DPMASM_USE_STATUS_OPTIONS = [
  { codeKorName: 'Yes', commCode: 'Y' },
  { codeKorName: 'No', commCode: 'N' },
];

const DPMASM_PROC_CODE_OPTIONS = [
  { procCode: 'P-100', procName: '기초공정', prdCi: 'SC' },
  { procCode: 'P-110', procName: '혼합공정', prdCi: 'SC' },
  { procCode: 'P-200', procName: '색조공정', prdCi: 'MK' },
  { procCode: 'P-210', procName: '포장공정', prdCi: 'MK' },
];

const DPMASM_PROC_ROWS = [
  {
    cudType: '',
    plant: 'PL01',
    prdCi: 'SC',
    procCode: 'P-100',
    procName: '기초공정',
    routeSeq: '10',
    remark: '기본 흐름',
    cudCi: 'Y',
  },
  {
    cudType: '',
    plant: 'PL01',
    prdCi: 'SC',
    procCode: 'P-110',
    procName: '혼합공정',
    routeSeq: '20',
    remark: '배치 혼합',
    cudCi: 'Y',
  },
  {
    cudType: '',
    plant: 'PL02',
    prdCi: 'MK',
    procCode: 'P-200',
    procName: '색조공정',
    routeSeq: '10',
    remark: '톤 조정',
    cudCi: 'N',
  },
];

const DPMASM_PROC_DTL_ROWS = [
  {
    cudType: '',
    plant: 'PL01',
    prdCi: 'SC',
    procCode: 'P-100',
    procDtlCode: 'S-101',
    procDtlName: '원료 투입',
    routeSeq: '1',
    procType: 'MIX',
    cudCi: 'Y',
    remark: '투입 순서 확인',
  },
  {
    cudType: '',
    plant: 'PL01',
    prdCi: 'SC',
    procCode: 'P-110',
    procDtlCode: 'S-111',
    procDtlName: '온도 조절',
    routeSeq: '2',
    procType: 'MIX',
    cudCi: 'Y',
    remark: '온도 모니터링',
  },
  {
    cudType: '',
    plant: 'PL02',
    prdCi: 'MK',
    procCode: 'P-200',
    procDtlCode: 'S-201',
    procDtlName: '분산',
    routeSeq: '1',
    procType: 'FILL',
    cudCi: 'N',
    remark: '분산 속도 체크',
  },
];

const DPMASM_TAB2_ROWS = [
  {
    plant: 'PL01',
    prdCi: 'SC',
    procCode: 'P-100',
    procName: '기초공정',
    procDtlCode: 'S-101',
    procDtlName: '원료 투입',
    procType: 'MIX',
    remark: '투입 순서 확인',
  },
  {
    plant: 'PL01',
    prdCi: 'SC',
    procCode: 'P-110',
    procName: '혼합공정',
    procDtlCode: 'S-111',
    procDtlName: '온도 조절',
    procType: 'MIX',
    remark: '온도 모니터링',
  },
  {
    plant: 'PL02',
    prdCi: 'MK',
    procCode: 'P-200',
    procName: '색조공정',
    procDtlCode: 'S-201',
    procDtlName: '분산',
    procType: 'FILL',
    remark: '분산 속도 체크',
  },
];

export const getDsPlantOptionsMock = http.get('/api/bff/basic-infos/dpmasm-process/options/plants', () => {
  return HttpResponse.json({ result: 'true', message: 'OK', responseBody: DPMASM_PLANT_OPTIONS });
});

export const getDsPrdCiOptionsMock = http.get('/api/bff/basic-infos/dpmasm-process/options/product-categories', () => {
  return HttpResponse.json({ result: 'true', message: 'OK', responseBody: DPMASM_PRD_CI_OPTIONS });
});

export const getDsProcTypeOptionsMock = http.get('/api/bff/basic-infos/dpmasm-process/options/proc-types', () => {
  return HttpResponse.json({ result: 'true', message: 'OK', responseBody: DPMASM_PROC_TYPE_OPTIONS });
});

export const getDsCudCiOptionsMock = http.get('/api/bff/basic-infos/dpmasm-process/options/use-status', () => {
  return HttpResponse.json({ result: 'true', message: 'OK', responseBody: DPMASM_USE_STATUS_OPTIONS });
});

export const getDsProcCdOptionsMock = http.get('/api/bff/basic-infos/dpmasm-process/options/proc-codes', ({ request }) => {
    const url = new URL(request.url);
    const prdCi = url.searchParams.get('prdCi');
    
    const filtered = prdCi
      ? DPMASM_PROC_CODE_OPTIONS.filter((row) => row.prdCi === prdCi)
      : DPMASM_PROC_CODE_OPTIONS;

    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: filtered.map(({ procCode, procName }) => ({ procCode, procName })),
    });
  });

export const getDsProcRowsMock = http.get('/api/bff/basic-infos/dpmasm-process/proc', ({ request }) => {
    const url = new URL(request.url);
    const prdCi = url.searchParams.get('prdCi');
    const procCode = url.searchParams.get('procCode');
    const cudCi = url.searchParams.get('cudCi');

    const filtered = DPMASM_PROC_ROWS.filter((row) => {
      if (prdCi && row.prdCi !== prdCi) return false;
      if (procCode && row.procCode !== procCode) return false;
      if (cudCi && row.cudCi !== cudCi) return false;
      return true;
    });

    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: filtered,
    });
  });

export const getDsProcDtlRowsMock = http.get('/api/bff/basic-infos/dpmasm-process/proc-dtl', ({ request }) => {
    const url = new URL(request.url);
    const prdCi = url.searchParams.get('prdCi');
    const procCode = url.searchParams.get('procCode');
    const cudCi = url.searchParams.get('cudCi');

    const filtered = DPMASM_PROC_DTL_ROWS.filter((row) => {
      if (prdCi && row.prdCi !== prdCi) return false;
      if (procCode && row.procCode !== procCode) return false;
      if (cudCi && row.cudCi !== cudCi) return false;
      return true;
    });

    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: filtered,
    });
  });

export const getDsTab2RowsMock = http.get('/api/bff/basic-infos/dpmasm-process/tab2', ({ request }) => {
    const url = new URL(request.url);
    const prdCi = url.searchParams.get('prdCi');
    const procCode = url.searchParams.get('procCode');

    const filtered = DPMASM_TAB2_ROWS.filter((row) => {
      if (prdCi && row.prdCi !== prdCi) return false;
      if (procCode && row.procCode !== procCode) return false;
      return true;
    });

    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: filtered,
    });
  });

export const postDsProcRowsSaveMock = http.post('/api/bff/basic-infos/dpmasm-process/commands/save-proc', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: payload,
    });
  });

export const postDsProcDtlRowsSaveMock = http.post('/api/bff/basic-infos/dpmasm-process/commands/save-proc-dtl', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: payload,
    });
  });

export const dpmasmProcessHandlers = [
  getDsPlantOptionsMock,
  getDsPrdCiOptionsMock,
  getDsProcTypeOptionsMock,
  getDsCudCiOptionsMock,
  getDsProcCdOptionsMock,
  getDsProcRowsMock,
  getDsProcDtlRowsMock,
  getDsTab2RowsMock,
];

export const dpmasmProcessMutationHandlers = [
  postDsProcRowsSaveMock,
  postDsProcDtlRowsSaveMock,
];
