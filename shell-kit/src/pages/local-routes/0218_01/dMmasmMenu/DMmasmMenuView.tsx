import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type DMmasmMenuViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGrid1Initialized: (grid: FlexGrid) => void;
  onGrid2Initialized: (grid: FlexGrid) => void;
};

const DMmasmMenuView = (props: DMmasmMenuViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGrid1Initialized,
    onGrid2Initialized,
  } = props;

  return (
    <ViewFill variant="root">
      <CommonButtons {...commonButtonsProps} />
      <header className="shrink-0">
        {searchSection}
      </header>
      <div className="flex h-full gap-4" style={{ flex: 1, minHeight: 0 }}>
        <ViewFill>
          <div className="text-sm font-medium py-1">전체 Menu List</div>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid1Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
        <ViewFill>
          <div className="text-sm font-medium py-1">My Menu List</div>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid2Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
      </div>
    </ViewFill>
  );
};

export default DMmasmMenuView;
