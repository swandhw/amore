import type { FlexGrid } from '@mescius/wijmo.grid';
import type { NewProductFilterOption } from './hooks/useNewProductFilterDataset';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
export type NewProductRegisterViewProps = {
    categoryDataset: NewProductFilterOption[];
    useStatusDataset: NewProductFilterOption[];
    commonButtonsProps: CommonButtonsProps;
    onGridInitialized: (grid: FlexGrid) => void;
};
declare const NewProductRegisterView: (props: NewProductRegisterViewProps) => import("react/jsx-runtime").JSX.Element;
export default NewProductRegisterView;
