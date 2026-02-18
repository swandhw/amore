import { FlexGrid } from '@mescius/wijmo.grid';
/**
 * React Hook to attach a context menu to a Wijmo FlexGrid.
 * @param grid The FlexGrid instance.
 */
export declare const useGridContextMenu: (grid: FlexGrid | null | undefined, pageName?: string, gridName?: string) => void;
/**
 * Class that handles the creation and logic of the FlexGrid Context Menu.
 */
export declare class FlexGridContextMenu {
    private _grid;
    private _menu;
    private _contextMenuHandler;
    private _pageName?;
    private _gridName?;
    private _initialColumnLayout;
    constructor(grid: FlexGrid, pageName?: string, gridName?: string);
    dispose(): void;
    private _handleContextMenu;
    private _getStorageKey;
    private _saveSettings;
    private _loadSettings;
    private _resetSettings;
    private _buildMenu;
}
