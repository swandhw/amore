import type { GridColumnDef } from '@/components/ap-wijmo/grid/GridTypes';
import { createDataMap } from '@/components/ap-wijmo/grid/Util';

import type {
  DsCudCiOption,
  DsPlantOption,
  DsPrdCiOption,
  DsProcCdOption,
  DsProcDtlRow,
  DsProcRow,
  DsProcTypeOption,
  DsTab2Row,
} from '../types/DpmasmProcessTypes';

export const createProcGridColumns = ({
  dsPlantOptions,
  dsPrdCiOptions,
  dsCudCiOptions,
}: {
  dsPlantOptions: DsPlantOption[];
  dsPrdCiOptions: DsPrdCiOption[];
  dsCudCiOptions: DsCudCiOption[];
}): GridColumnDef<DsProcRow>[] => {
  return [
    {
      header: '사업장',
      width: 100,
      binding: 'plant',
      dataType: 'String',
      dataMap: createDataMap(dsPlantOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '대공정 코드',
      width: 120,
      binding: 'procCode',
      dataType: 'String',
    },
    {
      header: '대공정',
      width: 180,
      binding: 'procName',
      dataType: 'String',
    },
    {
      header: '제품구분',
      width: 140,
      binding: 'prdCi',
      dataType: 'String',
      dataMap: createDataMap(dsPrdCiOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '순번',
      width: 90,
      binding: 'routeSeq',
      dataType: 'String',
    },
    {
      header: '사용유무',
      width: 110,
      binding: 'cudCi',
      dataType: 'String',
      dataMap: createDataMap(dsCudCiOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '비고',
      width: '*',
      binding: 'remark',
      dataType: 'String',
    },
  ];
};

export const createProcDtlGridColumns = ({
  dsPlantOptions,
  dsPrdCiOptions,
  dsProcCdOptions,
  dsProcTypeOptions,
  dsCudCiOptions,
}: {
  dsPlantOptions: DsPlantOption[];
  dsPrdCiOptions: DsPrdCiOption[];
  dsProcCdOptions: DsProcCdOption[];
  dsProcTypeOptions: DsProcTypeOption[];
  dsCudCiOptions: DsCudCiOption[];
}): GridColumnDef<DsProcDtlRow>[] => {
  return [
    {
      header: '사업장',
      width: 100,
      binding: 'plant',
      dataType: 'String',
      dataMap: createDataMap(dsPlantOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '제품구분',
      width: 140,
      binding: 'prdCi',
      dataType: 'String',
      dataMap: createDataMap(dsPrdCiOptions, 'commCode', 'codeKorNameRe'),
    },
    {
      header: '대공정',
      width: 160,
      binding: 'procCode',
      dataType: 'String',
      dataMap: createDataMap(dsProcCdOptions, 'procCode', 'procName'),
    },
    {
      header: '소공정 코드',
      width: 120,
      binding: 'procDtlCode',
      dataType: 'String',
    },
    {
      header: '소공정',
      width: 200,
      binding: 'procDtlName',
      dataType: 'String',
    },
    {
      header: '공정유형',
      width: 130,
      binding: 'procType',
      dataType: 'String',
      dataMap: createDataMap(dsProcTypeOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '순번',
      width: 90,
      binding: 'routeSeq',
      dataType: 'String',
    },
    {
      header: '작업내용',
      width: '*',
      binding: 'remark',
      dataType: 'String',
    },
    {
      header: '사용유무',
      width: 110,
      binding: 'cudCi',
      dataType: 'String',
      dataMap: createDataMap(dsCudCiOptions, 'commCode', 'codeKorName'),
    },
  ];
};

export const createTab2GridColumns = ({
  dsPlantOptions,
  dsPrdCiOptions,
  dsProcTypeOptions,
}: {
  dsPlantOptions: DsPlantOption[];
  dsPrdCiOptions: DsPrdCiOption[];
  dsProcTypeOptions: DsProcTypeOption[];
}): GridColumnDef<DsTab2Row>[] => {
  return [
    {
      header: '사업장',
      width: 100,
      binding: 'plant',
      dataType: 'String',
      isReadOnly: true,
      dataMap: createDataMap(dsPlantOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '제품구분',
      width: 140,
      binding: 'prdCi',
      dataType: 'String',
      isReadOnly: true,
      dataMap: createDataMap(dsPrdCiOptions, 'commCode', 'codeKorNameRe'),
    },
    {
      header: '대공정 코드',
      width: 140,
      binding: 'procCode',
      dataType: 'String',
      isReadOnly: true,
    },
    {
      header: '대공정',
      width: 200,
      binding: 'procName',
      dataType: 'String',
      isReadOnly: true,
    },
    {
      header: '소공정 코드',
      width: 140,
      binding: 'procDtlCode',
      dataType: 'String',
      isReadOnly: true,
    },
    {
      header: '소공정',
      width: 200,
      binding: 'procDtlName',
      dataType: 'String',
      isReadOnly: true,
    },
    {
      header: '공정유형',
      width: 130,
      binding: 'procType',
      dataType: 'String',
      isReadOnly: true,
      dataMap: createDataMap(dsProcTypeOptions, 'commCode', 'codeKorName'),
    },
    {
      header: '작업내용',
      width: '*',
      binding: 'remark',
      dataType: 'String',
      isReadOnly: true,
    },
  ];
};
