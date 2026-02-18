import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import { useState, useCallback, useRef } from 'react';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type Qsear30PrdTraceViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGrid1Initialized: (grid: FlexGrid) => void;
  onGrid2Initialized: (grid: FlexGrid) => void;
  onGrid3Initialized: (grid: FlexGrid) => void;
  onGrid4Initialized: (grid: FlexGrid) => void;
};

const Qsear30PrdTraceView = (props: Qsear30PrdTraceViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGrid1Initialized,
    onGrid2Initialized,
    onGrid3Initialized,
    onGrid4Initialized,
  } = props;

  const [activeTab, setActiveTab] = useState(0);

  return (
    <ViewFill variant="root">
      <CommonButtons {...commonButtonsProps} />
      <header className="shrink-0">
        {searchSection}
      </header>
      <ViewFill>
        <div className="flex border-b border-gray-300">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(0)}
          >
            완제품
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(1)}
          >
            내용물
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(2)}
          >
            원료
          </button>
        </div>
        {activeTab === 0 && (
          <div className="flex-1 min-h-0">
            <wjGrid.FlexGrid
              autoGenerateColumns={false}
              initialized={onGrid1Initialized}
              style={{ height: '100%' }}
            />
          </div>
        )}
      </ViewFill>
    </ViewFill>
  );
};

export default Qsear30PrdTraceView;
