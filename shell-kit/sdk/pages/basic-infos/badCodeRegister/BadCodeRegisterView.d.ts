import type { FlexGrid } from '@mescius/wijmo.grid';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
export type BadCodeRegisterViewProps = {
    searchSection?: React.ReactNode;
    commonButtonsProps: CommonButtonsProps;
    onGridInitialized: (grid: FlexGrid) => void;
};
declare const BadCodeRegisterView: (props: BadCodeRegisterViewProps) => import("react/jsx-runtime").JSX.Element;
export default BadCodeRegisterView;
