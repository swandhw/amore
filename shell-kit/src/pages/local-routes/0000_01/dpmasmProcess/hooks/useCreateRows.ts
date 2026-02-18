import type { DsProcDtlRow, DsProcRow, DsTab2Row } from '../types/DpmasmProcessTypes';

export const createProcRow = (): DsProcRow => {
  return {
    plant: '',
    prdCi: '',
    procCode: '',
    procName: '',
    routeSeq: '',
    remark: '',
    cudCi: 'Y',
  };
};

export const createProcDtlRow = (): DsProcDtlRow => {
  return {
    plant: '',
    prdCi: '',
    procCode: '',
    procDtlCode: '',
    procDtlName: '',
    routeSeq: '',
    procType: '',
    cudCi: 'Y',
    remark: '',
  };
};

export const createTab2Row = (): DsTab2Row => {
  return {
    plant: '',
    prdCi: '',
    procCode: '',
    procName: '',
    procDtlCode: '',
    procDtlName: '',
    procType: '',
    remark: '',
  };
};
