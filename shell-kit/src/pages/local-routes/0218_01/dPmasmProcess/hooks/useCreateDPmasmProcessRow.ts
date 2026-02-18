import type { DPmasmProcessRow } from '../types/DPmasmProcessTypes';

export const createDPmasmProcessRow = (): DPmasmProcessRow => {
  return {
    plant: '',
    prdCi: '',
    procCode: '',
    procName: '',
    routeSeq: '',
    remark: '',
    cudCi: 'Y',
    color: '',
  };
};
