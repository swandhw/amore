import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type DMwrkrLineFpMoniViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGrid1Initialized: (grid: FlexGrid) => void;
  onGrid2Initialized: (grid: FlexGrid) => void;
  onGrid3Initialized: (grid: FlexGrid) => void;
  onGrid4Initialized: (grid: FlexGrid) => void;
  onGrid5Initialized: (grid: FlexGrid) => void;
  onGrid6Initialized: (grid: FlexGrid) => void;
};

const DMwrkrLineFpMoniView = (props: DMwrkrLineFpMoniViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGrid1Initialized,
    onGrid2Initialized,
    onGrid3Initialized,
    onGrid4Initialized,
    onGrid5Initialized,
    onGrid6Initialized,
  } = props;

  return (
    <ViewFill variant="root">
      <CommonButtons {...commonButtonsProps} />
      <header className="shrink-0">
        {searchSection}
      </header>
      <div className="flex flex-col gap-2" style={{ flex: 1, minHeight: 0 }}>
        <ViewFill>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid1Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
        <ViewFill>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid2Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
        <ViewFill>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid3Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
        <ViewFill>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid4Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
        <ViewFill>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid5Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
        <ViewFill>
          <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onGrid6Initialized}
            style={{ height: '100%' }}
          />
        </ViewFill>
      </div>
    </ViewFill>
  );
};

export default DMwrkrLineFpMoniView;
