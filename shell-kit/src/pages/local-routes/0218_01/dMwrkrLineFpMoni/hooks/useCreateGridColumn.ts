import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";
import {
  createGroupNode,
  createLeafNode,
  type HeaderNode,
} from "@/components/ap-wijmo/grid/HeaderTree";
import type { DMwrkrLineFpMoniRow } from "../types/DMwrkrLineFpMoniTypes";

export const createDatagrid2ColumnDefinition = (): GridColumnDef<DMwrkrLineFpMoniRow>[] => {
  return [
    {
      header: '라인',
      width: 60,
      binding: 'wrkCenter',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '',
      width: '*',
      binding: 'gb2',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '제품 내역',
      width: 150,
      binding: 'matrName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '오더번호',
      width: 60,
      binding: 'pacOrder',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '시작시간',
      width: 60,
      binding: 'wrkStartTime',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '요청량',
      width: 60,
      binding: 'wrkOrderQty',
      dataType: 'String',
      align: 'right',
    },
    {
      header: '생산량',
      width: 60,
      binding: 'curPdtQty',
      dataType: 'String',
      align: 'right',
    },
  ];
}

export const createDatagrid1ColumnDefinition = (): GridColumnDef<DMwrkrLineFpMoniRow>[] => {
  return [
    {
      header: '라인',
      width: 60,
      binding: 'wrkCenter',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '',
      width: '*',
      binding: 'gb2',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '제품 내역',
      width: 150,
      binding: 'matrName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '오더번호',
      width: 60,
      binding: 'pacOrder',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '시작시간',
      width: 60,
      binding: 'wrkStartTime',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '요청량',
      width: 60,
      binding: 'wrkOrderQty',
      dataType: 'String',
      align: 'right',
    },
    {
      header: '생산량',
      width: 60,
      binding: 'curPdtQty',
      dataType: 'String',
      align: 'right',
    },
  ];
}

export const createDatagrid3ColumnDefinition = (): GridColumnDef<DMwrkrLineFpMoniRow>[] => {
  return [
    {
      header: '라인',
      width: 60,
      binding: 'wrkCenter',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '',
      width: '*',
      binding: 'gb2',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '제품 내역',
      width: 150,
      binding: 'matrName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '오더번호',
      width: 60,
      binding: 'pacOrder',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '시작시간',
      width: 60,
      binding: 'wrkStartTime',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '요청량',
      width: 60,
      binding: 'wrkOrderQty',
      dataType: 'String',
      align: 'right',
    },
    {
      header: '생산량',
      width: 60,
      binding: 'curPdtQty',
      dataType: 'String',
      align: 'right',
    },
  ];
}

export const createDatagrid4ColumnDefinition = (): GridColumnDef<DMwrkrLineFpMoniRow>[] => {
  return [
    {
      header: '라인',
      width: 60,
      binding: 'wrkCenter',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '',
      width: '*',
      binding: 'gb2',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '제품 내역',
      width: 150,
      binding: 'matrName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '오더번호',
      width: 60,
      binding: 'pacOrder',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '시작시간',
      width: 60,
      binding: 'wrkStartTime',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '요청량',
      width: 60,
      binding: 'wrkOrderQty',
      dataType: 'String',
      align: 'right',
    },
    {
      header: '생산량',
      width: 60,
      binding: 'curPdtQty',
      dataType: 'String',
      align: 'right',
    },
  ];
}

export const createDatagrid5ColumnDefinition = (): GridColumnDef<DMwrkrLineFpMoniRow>[] => {
  return [
    {
      header: '라인',
      width: 60,
      binding: 'wrkCenter',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '',
      width: '*',
      binding: 'gb2',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '제품 내역',
      width: 150,
      binding: 'matrName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '오더번호',
      width: 60,
      binding: 'pacOrder',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '시작시간',
      width: 60,
      binding: 'wrkStartTime',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '요청량',
      width: 60,
      binding: 'wrkOrderQty',
      dataType: 'String',
      align: 'right',
    },
    {
      header: '생산량',
      width: 60,
      binding: 'curPdtQty',
      dataType: 'String',
      align: 'right',
    },
  ];
}

export const createDatagrid6ColumnDefinition = (): GridColumnDef<DMwrkrLineFpMoniRow>[] => {
  return [
    {
      header: '라인',
      width: 60,
      binding: 'wrkCenter',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '',
      width: '*',
      binding: 'gb2',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '제품 내역',
      width: 150,
      binding: 'matrName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '오더번호',
      width: 60,
      binding: 'pacOrder',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '시작시간',
      width: 60,
      binding: 'wrkStartTime',
      dataType: 'String',
      align: 'center',
    },
    {
      header: '요청량',
      width: 60,
      binding: 'wrkOrderQty',
      dataType: 'String',
      align: 'right',
    },
    {
      header: '생산량',
      width: 60,
      binding: 'curPdtQty',
      dataType: 'String',
      align: 'right',
    },
  ];
}

export const D_MWRKR_LINE_FP_MONI_HEADER_TREE: HeaderNode[] = [
  createLeafNode("wrkCenter", "라인", "wrkCenter"),
  createLeafNode("gb2", "", "gb2"),
  createLeafNode("matrName", "제품 내역", "matrName"),
  createLeafNode("pacOrder", "오더번호", "pacOrder"),
  createLeafNode("wrkStartTime", "시작시간", "wrkStartTime"),
  createLeafNode("wrkOrderQty", "요청량", "wrkOrderQty"),
  createLeafNode("curPdtQty", "생산량", "curPdtQty"),
];
