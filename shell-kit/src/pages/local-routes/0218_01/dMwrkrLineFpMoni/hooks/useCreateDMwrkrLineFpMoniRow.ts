import type { DMwrkrLineFpMoniRow } from '../types/DMwrkrLineFpMoniTypes';

export const createDMwrkrLineFpMoniRow = (): DMwrkrLineFpMoniRow => {
  return {
    plant: '',
    wrkCenter: '',
    centerFlag: '',
    pacOrder: '',
    prdCode: '',
    matrName: '',
    curPdtQty: '',
    wrkOrderQty: '',
    wrkStartTime: '',
    seq: '',
  };
};
