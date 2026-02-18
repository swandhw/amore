import * as wjGrid from '@mescius/wijmo.react.grid';
import type { DpmasmProcessRegisterTabViewProps } from './types/DpmasmProcessTypes';
import { ResizableSplitView } from '@/components/layout/ResizableSplitView';

export const DpmasmProcessRegisterTabView = (props : DpmasmProcessRegisterTabViewProps) => {
    const {onProcGridInitialized, onProcDtlGridInitialized} = props;
    return (
    <ResizableSplitView primary={(
        <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onProcGridInitialized}
            style={{ height: '100%' }}
        />
        )}
        secondary={(
        <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onProcDtlGridInitialized}
            style={{ height: '100%' }}
        />
        )}
    />
    )
}
