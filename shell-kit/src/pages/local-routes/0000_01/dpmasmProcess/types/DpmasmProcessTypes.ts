import { type FlexGrid } from '@mescius/wijmo.grid';

export type DpmasmProcessSearchParams = {
  plant?: string | null;
  prdCi?: string | null;
  procCode?: string | null;
  cudCi?: string | null;
};

export type DsProcRow = {
  _op?: 'C' | 'U' | 'D' | '';
  cudType?: string;
  plant: string;
  prdCi: string;
  procCode: string;
  procName: string;
  routeSeq: string;
  remark: string;
  cudCi: string;
  color?: string;
};

export type DsProcDtlRow = {
  _op?: 'C' | 'U' | 'D' | '';
  cudType?: string;
  plant: string;
  prdCi: string;
  procCode: string;
  procDtlCode: string;
  procDtlName: string;
  routeSeq: string;
  procType: string;
  cudCi: string;
  remark: string;
};

export type DsTab2Row = {
  plant: string;
  prdCi: string;
  procCode: string;
  procName: string;
  procDtlCode: string;
  procDtlName: string;
  procType: string;
  remark: string;
};

export type DsCudTypeOption = {
  codeKorName: string;
  commCode: string;
};

export type DsCudCiOption = {
  codeKorName: string;
  commCode: string;
};

export type DsPlantOption = {
  codeKorName: string;
  commCode: string;
};

export type DsPrdCiOption = {
  codeKorName: string;
  codeKorNameRe: string;
  commCode: string;
};

export type DsProcTypeOption = {
  codeKorName: string;
  commCode: string;
};

export type DsProcCdOption = {
  procCode: string;
  procName: string;
};

export type DpmasmProcessStatusTabViewProps = {
    onTab2GridInitialized: (grid: FlexGrid) => void;
}

export type DpmasmProcessRegisterTabViewProps = {
  onProcGridInitialized: (grid: FlexGrid) => void;
  onProcDtlGridInitialized: (grid: FlexGrid) => void;
}