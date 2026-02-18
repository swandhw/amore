export type DMmasmBadCodeRow = {
  prdCi: string;
  badCi: string;
  badCode: string;
  badCodeName: string;
  cudCi: string;
  remark: string;
};

export type DMmasmBadCodeSearchParams = {
  combo1?: string | null;  // 코드타입
  combo2?: string | null;  // 사용유무
};

export type DsSearchListResult535Row = {
  codeKorName: string;
  commCode: string;
};

export type DsSearchListResult14Row = {
  codeKorName: string;
  commCode: string;
};

export type DsCombo1 = {
  codeKorNameRe: string;
  commCode: string;
};

export type DsCombo2 = {
  codeKorNameRe: string;
  commCode: string;
};

