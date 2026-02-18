import type { FlexGrid } from '@mescius/wijmo.grid';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
export type DpmasmProcessViewProps = {
    t: (key: string) => string;
    activeTab: string;
    onTabChange: (value: string) => void;
    searchSection?: React.ReactNode;
    commonButtonsProps: CommonButtonsProps;
    onProcGridInitialized: (grid: FlexGrid) => void;
    onProcDtlGridInitialized: (grid: FlexGrid) => void;
    onTab2GridInitialized: (grid: FlexGrid) => void;
};
declare const DpmasmProcessView: (props: DpmasmProcessViewProps) => import("react/jsx-runtime").JSX.Element;
export default DpmasmProcessView;
