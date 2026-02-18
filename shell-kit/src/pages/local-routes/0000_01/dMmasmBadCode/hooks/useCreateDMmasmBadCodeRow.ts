import type { DMmasmBadCodeRow } from '../types/DMmasmBadCodeTypes';

export const createDMmasmBadCodeRow = (): DMmasmBadCodeRow => {
  return {
    prdCi: '',
    badCi: '',
    badCode: '',
    badCodeName: '',
    cudCi: 'Y',
    remark: '',
  };
};
