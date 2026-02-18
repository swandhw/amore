export type DMmasmMenuRow = {
  bizCi: string;
  programName: string;
  programId: string;
};

export type DMmasmMenuSearchParams = {
  combo2?: string | null;  // 화면레벨2
  combo1?: string | null;  // 화면레벨1
};

export type DsCombo2 = {
  codeKorNameRe: string;
  commCode: string;
};

export type DsCombo1 = {
  codeKorNameRe: string;
  commCode: string;
};

