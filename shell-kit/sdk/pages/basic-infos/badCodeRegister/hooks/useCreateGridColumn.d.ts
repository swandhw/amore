import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";
import { type HeaderNode } from "@/components/ap-wijmo/grid/HeaderTree";
import type { BadCodeRegisterRow, DsCombo1, DsSearchListResult14Row, DsSearchListResult535Row } from "../types/BadCodeRegisterTypes";
export declare const createDatagrid1ColumnDefinition: ({ dsSearchListResult535Row, dsSearchlistresult14Row, dsCombo1 }: {
    dsSearchListResult535Row: DsSearchListResult535Row[];
    dsSearchlistresult14Row: DsSearchListResult14Row[];
    dsCombo1: DsCombo1[];
}) => GridColumnDef<BadCodeRegisterRow>[];
export declare const BAD_CODE_HEADER_TREE: HeaderNode[];
