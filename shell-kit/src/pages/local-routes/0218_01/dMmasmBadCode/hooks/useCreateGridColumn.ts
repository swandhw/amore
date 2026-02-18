import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";
import {
  createGroupNode,
  createLeafNode,
  type HeaderNode,
} from "@/components/ap-wijmo/grid/HeaderTree";
import type { DMmasmBadCodeRow, DsSearchListResult535Row, DsCombo1, DsSearchListResult14Row } from "../types/DMmasmBadCodeTypes";
import { createDataMap } from "@/components/ap-wijmo/grid/Util";

export const createDatagrid1ColumnDefinition = ({
    dsSearchListResult535Row,
    dsCombo1,
    dsSearchListResult14Row,
} : {
    dsSearchListResult535Row: DsSearchListResult535Row[],
    dsCombo1: DsCombo1[],
    dsSearchListResult14Row: DsSearchListResult14Row[],
}): GridColumnDef<DMmasmBadCodeRow>[] => {
  return [
    {
      header: '제품구분',
      width: 100,
      binding: 'prdCi',
      dataType: 'String',
      dataMap: createDataMap(dsSearchListResult535Row, 'commCode', 'codeKorName'),
    },
    {
      header: '불량코드구분',
      width: 108,
      binding: 'badCi',
      dataType: 'String',
      align: 'center',
      dataMap: createDataMap(dsCombo1, 'commCode', 'codeKorNameRe'),
    },
    {
      header: '불량코드',
      width: 94,
      binding: 'badCode',
      dataType: 'String',
    },
    {
      header: '불량코드명',
      width: 300,
      binding: 'badCodeName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '사용유무',
      width: 75,
      binding: 'cudCi',
      dataType: 'String',
      align: 'center',
      dataMap: createDataMap(dsSearchListResult14Row, 'commCode', 'codeKorName'),
    },
    {
      header: '비고',
      width: 205,
      binding: 'remark',
      dataType: 'String',
      align: 'left',
    },
  ];
}

export const D_MMASM_BAD_CODE_HEADER_TREE: HeaderNode[] = [
  createLeafNode("prdCi", "제품구분", "prdCi"),
  createGroupNode("badCodeGroup", "불량코드", [
    createLeafNode("badCi", "불량코드구분", "badCi"),
    createLeafNode("badCode", "불량코드", "badCode"),
    createLeafNode("badCodeName", "불량코드명", "badCodeName"),
  ]),
  createLeafNode("cudCi", "사용유무", "cudCi"),
  createLeafNode("remark", "비고", "remark"),
];
