import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import { useState, useCallback, useRef } from 'react';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type Qcdvm10NewitemViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGridInitialized: (grid: FlexGrid) => void;
};

const Qcdvm10NewitemView = (props: Qcdvm10NewitemViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGridInitialized,
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
            조회
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(1)}
          >
            상세내역
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(2)}
          >
            안정성검사
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 3 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(3)}
          >
            BOM 연결
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 4 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(4)}
          >
            변경이력
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

export default Qcdvm10NewitemView;
