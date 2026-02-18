import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";
import {
  createGroupNode,
  createLeafNode,
  type HeaderNode,
} from "@/components/ap-wijmo/grid/HeaderTree";
import type { DPmasmProcessRow, DsPlant, DsProcCd, DsProcType, DsCudCi } from "../types/DPmasmProcessTypes";
import { createDataMap } from "@/components/ap-wijmo/grid/Util";

export const createGrdProcColumnDefinition = (): GridColumnDef<DPmasmProcessRow>[] => {
  return [
    {
      header: '사업장',
      width: '*',
      binding: 'plant',
      dataType: 'String',
    },
    {
      header: '대공정',
      width: 60,
      binding: 'procCode',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '공정명',
      width: 120,
      binding: 'procName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '제품구분',
      width: 80,
      binding: 'prdCi',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '순번',
      width: 50,
      binding: 'routeSeq',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '사용유무',
      width: 50,
      binding: 'cudCi',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '비고',
      width: '*',
      binding: 'remark',
      dataType: 'String',
      align: 'left',
    },
  ];
}

export const createGrdProcdtlColumnDefinition = ({
    dsPlant,
    dsProcCd,
    dsProcType,
    dsCudCi,
} : {
    dsPlant: DsPlant[],
    dsProcCd: DsProcCd[],
    dsProcType: DsProcType[],
    dsCudCi: DsCudCi[],
}): GridColumnDef<DPmasmProcessRow>[] => {
  return [
    {
      header: '사업장',
      width: '*',
      binding: 'plant',
      dataType: 'String',
      dataMap: createDataMap(dsPlant, 'commCode', 'codeKorName'),
    },
    {
      header: '제품구분',
      width: '*',
      binding: 'prdCi',
      dataType: 'String',
    },
    {
      header: '대공정',
      width: '*',
      binding: 'procCode',
      dataType: 'String',
      align: 'left',
      dataMap: createDataMap(dsProcCd, 'procCode', 'procName'),
    },
    {
      header: '소공정',
      width: 50,
      binding: 'procDtlCode',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '공정명',
      width: 250,
      binding: 'procDtlName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '공정유형',
      width: 70,
      binding: 'procType',
      dataType: 'String',
      align: 'center',
      dataMap: createDataMap(dsProcType, 'commCode', 'codeKorName'),
    },
    {
      header: '순번',
      width: 50,
      binding: 'routeSeq',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '작업내용',
      width: 300,
      binding: 'remark',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '사용유무',
      width: 60,
      binding: 'cudCi',
      dataType: 'String',
      align: 'center',
      dataMap: createDataMap(dsCudCi, 'commCode', 'codeKorName'),
    },
  ];
}

export const createGrdGridt2ColumnDefinition = ({
    dsPlant,
} : {
    dsPlant: DsPlant[],
}): GridColumnDef<DPmasmProcessRow>[] => {
  return [
    {
      header: '사업장',
      width: '*',
      binding: 'plant',
      dataType: 'String',
      align: 'center',
      dataMap: createDataMap(dsPlant, 'commCode', 'codeKorName'),
    },
    {
      header: '제품구분',
      width: 130,
      binding: 'prdCi',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '공정',
      width: '*',
      binding: 'procCode',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '대공정',
      width: 200,
      binding: 'procName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '소공정 코드',
      width: '*',
      binding: 'procDtlCode',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '소공정',
      width: 320,
      binding: 'procDtlName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '공정유형',
      width: 90,
      binding: 'procType',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '작업내용',
      width: 350,
      binding: 'remark',
      dataType: 'String',
      align: 'left',
    },
  ];
}

export const D_PMASM_PROCESS_HEADER_TREE: HeaderNode[] = [
  createLeafNode("plant", "사업장", "plant"),
  createGroupNode("procCodeGroup", "대공정", [
    createLeafNode("procCode", "코드", "procCode"),
    createLeafNode("procName", "공정명", "procName"),
  ]),
  createLeafNode("prdCi", "제품구분", "prdCi"),
  createLeafNode("routeSeq", "순번", "routeSeq"),
  createLeafNode("cudCi", "사용유무", "cudCi"),
  createLeafNode("remark", "비고", "remark"),
];
