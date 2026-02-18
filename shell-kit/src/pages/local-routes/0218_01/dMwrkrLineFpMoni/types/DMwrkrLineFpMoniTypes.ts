export type DMwrkrLineFpMoniRow = {
  plant: string;
  wrkCenter: string;
  centerFlag: string;
  pacOrder: string;
  prdCode: string;
  matrName: string;
  curPdtQty: string;
  wrkOrderQty: string;
  wrkStartTime: string;
  seq: string;
};

export type DMwrkrLineFpMoniSearchParams = {
  combo1?: string | null;  // 포장작업그룹
  combo00?: string | null;  // 작업장(별칭)
};

export type DsSearchListResult044Row = {
  codeKorName: string;
  commCode: string;
};

export type DsCombo3 = {
  wrkAreaNameRe: string;
  wrkArea: string;
};

