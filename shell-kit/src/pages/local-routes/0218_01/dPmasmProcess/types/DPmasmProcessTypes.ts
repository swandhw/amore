export type DPmasmProcessRow = {
  plant: string;
  prdCi: string;
  procCode: string;
  procName: string;
  routeSeq: string;
  remark: string;
  cudCi: string;
  color: string;
};

export type DPmasmProcessSearchParams = {
  comboCudci?: string | null;  // 사용유무
  comboProccd?: string | null;  // 대공정
  comboPrdci?: string | null;  // 제품구분
};

export type DsCudCi = {
  commCode: string;
  codeKorName: string;
};

export type DsProcCd = {
  procCode: string;
  procName: string;
};

export type DsPrdCi = {
  commCode: string;
  codeKorName: string;
  codeKorNameRe: string;
};

export type DsProcType = {
  commCode: string;
  codeKorName: string;
};

export type DsPlant = {
  commCode: string;
  codeKorName: string;
};

