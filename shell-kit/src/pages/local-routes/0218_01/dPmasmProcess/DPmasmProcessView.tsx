import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import { useState, useCallback, useRef } from 'react';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type DPmasmProcessViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGrid1Initialized: (grid: FlexGrid) => void;
  onGrid2Initialized: (grid: FlexGrid) => void;
  onGrid3Initialized: (grid: FlexGrid) => void;
};

const DPmasmProcessView = (props: DPmasmProcessViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGrid1Initialized,
    onGrid2Initialized,
    onGrid3Initialized,
  } = props;

  const [activeTab, setActiveTab] = useState(0);

  const [leftWidth, setLeftWidth] = useState(46);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSplitterMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const onMouseMove = (ev: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.min(Math.max(pct, 10), 90));
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

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
            표준공정 등록
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(1)}
          >
            표준공정 현황
          </button>
        </div>
        {activeTab === 0 && (
          <div ref={containerRef} className="flex flex-1 min-h-0">
            <div style={{ width: `${leftWidth}%` }} className="min-w-0 overflow-hidden">
              <wjGrid.FlexGrid
                autoGenerateColumns={false}
                initialized={onGrid1Initialized}
                style={{ height: '100%' }}
              />
            </div>
            <div
              className="w-2 flex-shrink-0 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors"
              onMouseDown={handleSplitterMouseDown}
            />
            <div className="flex-1 min-w-0 overflow-hidden">
              <wjGrid.FlexGrid
                autoGenerateColumns={false}
                initialized={onGrid2Initialized}
                style={{ height: '100%' }}
              />
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="flex-1 min-h-0">
            <wjGrid.FlexGrid
              autoGenerateColumns={false}
              initialized={onGrid3Initialized}
              style={{ height: '100%' }}
            />
          </div>
        )}
      </ViewFill>
    </ViewFill>
  );
};

export default DPmasmProcessView;
