import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import { useState, useCallback, useRef } from 'react';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

export type Qsear35ContColorChartNViewProps = {
  commonButtonsProps: CommonButtonsProps;
  searchSection?: React.ReactNode;
  onGrid1Initialized: (grid: FlexGrid) => void;
  onGrid2Initialized: (grid: FlexGrid) => void;
  onGrid3Initialized: (grid: FlexGrid) => void;
};

const Qsear35ContColorChartNView = (props: Qsear35ContColorChartNViewProps) => {
  const {
    commonButtonsProps,
    searchSection,
    onGrid1Initialized,
    onGrid2Initialized,
    onGrid3Initialized,
  } = props;

  const [leftWidth, setLeftWidth] = useState(25);
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
        <div ref={containerRef} className="flex h-full">
          <div style={{ width: `${leftWidth}%` }} className="min-w-0 overflow-hidden">
            <wjGrid.FlexGrid
              autoGenerateColumns={false}
              initialized={onGrid1Initialized}
              style={{ height: '100%' }}
            />
            <wjGrid.FlexGrid
              autoGenerateColumns={false}
              initialized={onGrid2Initialized}
              style={{ height: '100%' }}
            />
            <wjGrid.FlexGrid
              autoGenerateColumns={false}
              initialized={onGrid3Initialized}
              style={{ height: '100%' }}
            />
          </div>
          <div
            className="w-2 flex-shrink-0 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors"
            onMouseDown={handleSplitterMouseDown}
          />
          <div className="flex-1 min-w-0 overflow-hidden">
          </div>
        </div>
      </ViewFill>
    </ViewFill>
  );
};

export default Qsear35ContColorChartNView;
