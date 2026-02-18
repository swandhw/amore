import * as wjGrid from '@mescius/wijmo.react.grid';
import type { DpmasmProcessStatusTabViewProps } from './types/DpmasmProcessTypes';

export const DpmasmProcessStatusTabView = (props : DpmasmProcessStatusTabViewProps) => {
    const {onTab2GridInitialized} = props;
    return (
 <wjGrid.FlexGrid
            autoGenerateColumns={false}
            initialized={onTab2GridInitialized}
            style={{ height: '100%' }}
          />
    )
}
