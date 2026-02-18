import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";
import {
  createGroupNode,
  createLeafNode,
  type HeaderNode,
} from "@/components/ap-wijmo/grid/HeaderTree";
import type { DMmasmMenuRow } from "../types/DMmasmMenuTypes";

export const createDatagrid1ColumnDefinition = (): GridColumnDef<DMmasmMenuRow>[] => {
  return [
    {
      header: '레벨',
      width: 185,
      binding: 'bizCi',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '화면명',
      width: 200,
      binding: 'programName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '화면ID',
      width: 199,
      binding: 'programId',
      dataType: 'String',
      align: 'left',
    },
  ];
}

export const createDatagrid2ColumnDefinition = (): GridColumnDef<DMmasmMenuRow>[] => {
  return [
    {
      header: '레벨',
      width: 185,
      binding: 'bizCi',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '화면명',
      width: 200,
      binding: 'programName',
      dataType: 'String',
      align: 'left',
    },
    {
      header: '화면ID',
      width: 200,
      binding: 'programId',
      dataType: 'String',
      align: 'left',
    },
  ];
}

export const D_MMASM_MENU_HEADER_TREE: HeaderNode[] = [
  createLeafNode("bizCi", "레벨", "bizCi"),
  createLeafNode("programName", "화면명", "programName"),
  createLeafNode("programId", "화면ID", "programId"),
];
