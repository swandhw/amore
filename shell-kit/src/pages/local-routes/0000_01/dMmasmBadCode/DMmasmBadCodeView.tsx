import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type DMmasmBadCodeViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGridInitialized: (grid: FlexGrid) => void;
};

const DMmasmBadCodeView = (props: DMmasmBadCodeViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGridInitialized,
  } = props;

  return (
    <ViewFill variant="root">
      <CommonButtons {...commonButtonsProps} />
      <header className="shrink-0">
        {searchSection}
      </header>
      <ViewFill>
        <wjGrid.FlexGrid
          autoGenerateColumns={false}
          initialized={onGridInitialized}
          style={{ height: '100%' }}
        />
      </ViewFill>
    </ViewFill>
  );
};

export default DMmasmBadCodeView;
