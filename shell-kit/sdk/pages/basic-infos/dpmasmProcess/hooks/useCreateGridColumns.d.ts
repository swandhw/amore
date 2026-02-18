import type { GridColumnDef } from '@/components/ap-wijmo/grid/GridTypes';
import type { DsCudCiOption, DsPlantOption, DsPrdCiOption, DsProcCdOption, DsProcDtlRow, DsProcRow, DsProcTypeOption, DsTab2Row } from '../types/DpmasmProcessTypes';
export declare const createProcGridColumns: ({ dsPlantOptions, dsPrdCiOptions, dsCudCiOptions, }: {
    dsPlantOptions: DsPlantOption[];
    dsPrdCiOptions: DsPrdCiOption[];
    dsCudCiOptions: DsCudCiOption[];
}) => GridColumnDef<DsProcRow>[];
export declare const createProcDtlGridColumns: ({ dsPlantOptions, dsPrdCiOptions, dsProcCdOptions, dsProcTypeOptions, dsCudCiOptions, }: {
    dsPlantOptions: DsPlantOption[];
    dsPrdCiOptions: DsPrdCiOption[];
    dsProcCdOptions: DsProcCdOption[];
    dsProcTypeOptions: DsProcTypeOption[];
    dsCudCiOptions: DsCudCiOption[];
}) => GridColumnDef<DsProcDtlRow>[];
export declare const createTab2GridColumns: ({ dsPlantOptions, dsPrdCiOptions, dsProcTypeOptions, }: {
    dsPlantOptions: DsPlantOption[];
    dsPrdCiOptions: DsPrdCiOption[];
    dsProcTypeOptions: DsProcTypeOption[];
}) => GridColumnDef<DsTab2Row>[];
