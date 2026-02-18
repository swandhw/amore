import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import DMmasmMenuView from './DMmasmMenuView';
import SearchConditionFields, {
  type SearchConditionFieldConfig,
  type SearchConditionValues,
} from '@/components/ap-wijmo/search/SearchConditionFields';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchDMmasmMenus,
  saveDMmasmMenus,
  fetchDMmasmMenuDatagrid2,
  fetchDsCombo2,
  fetchDsCombo1,
} from './api/dMmasmMenuApi';
import { createDMmasmMenuRow } from './hooks/useCreateDMmasmMenuRow';
import {
  D_MMASM_MENU_HEADER_TREE,
  createDatagrid1ColumnDefinition,
  createDatagrid2ColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  DMmasmMenuRow,
  DMmasmMenuSearchParams,
  DsCombo2,
  DsCombo1,
} from './types/DMmasmMenuTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'D_MMASM_MENU_PAGE';

export default function DMmasmMenuPage() {

  const i18n = useI18N(PAGE_NAME);

  const [dsCombo2, setDsCombo2] = useState<DsCombo2[]>([]);
  const [dsCombo1, setDsCombo1] = useState<DsCombo1[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});

  const searchFields = useMemo<SearchConditionFieldConfig[]>(
    () => [
      {
        id: 'combo2',
        label: '화면레벨2',
        type: 'combo',
        dataSource: dsCombo2,
        dataPathToText: 'codeKorNameRe',
        dataPathToValue: 'commCode',
        required: false,
      },
      {
        id: 'combo1',
        label: '화면레벨1',
        type: 'combo',
        dataSource: dsCombo1,
        dataPathToText: 'codeKorNameRe',
        dataPathToValue: 'commCode',
        required: false,
      },
    ],
    [dsCombo2, dsCombo1],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [resDsCombo2, resDsCombo1] = await Promise.all([
        fetchDsCombo2(),
        fetchDsCombo1(),
      ]);

      setDsCombo2(resDsCombo2.responseBody || []);
      setDsCombo1(resDsCombo1.responseBody || []);
    };

    fetchData();
  }, []);

  const isSearchComboReady = true ;//dsCombo2.length > 0 && dsCombo1.length > 0;

  const D_MMASM_MENU_COLUMNS_1 = useMemo(() => (
    createDatagrid1ColumnDefinition()
  ), []);

  const D_MMASM_MENU_COLUMNS_2 = useMemo(() => (
    createDatagrid2ColumnDefinition()
  ), []);

  const {
    handleSearch: handleSearch1,
    handleCreate: handleCreate1,
    handleDelete: handleDelete1,
    handleCommit: handleCommit1,
    handleExcel: handleExcel1,
    handleGridInitialized: handleGrid1InitBase,
  } = useGrid(
    createDMmasmMenuRow,
    fetchDMmasmMenus,
    saveDMmasmMenus,
    {
      columns: D_MMASM_MENU_COLUMNS_1,
      pageName: PAGE_NAME,
      gridName: 'grid1',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const {
    handleSearch: handleSearch2,
    handleCreate: handleCreate2,
    handleDelete: handleDelete2,
    handleCommit: handleCommit2,
    handleExcel: handleExcel2,
    handleGridInitialized: handleGrid2InitBase,
  } = useGrid(
    createDMmasmMenuRow,
    fetchDMmasmMenuDatagrid2,
    saveDMmasmMenus,
    {
      columns: D_MMASM_MENU_COLUMNS_2,
      pageName: PAGE_NAME,
      gridName: 'grid2',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const handleSearchWithFilters = useCallback(() => {
    // 여긴 이대로 두고 개발자가 조정하는게 맞는것 같다.
    const params: DMmasmMenuSearchParams = {
      combo2: typeof searchFilters.combo2 === 'string' ? searchFilters.combo2 : null,
      combo1: typeof searchFilters.combo1 === 'string' ? searchFilters.combo1 : null,
    };
    handleSearch1(params);
    handleSearch2(params);
  }, [handleSearch1, handleSearch2, searchFilters]);

  const handleCommitAll = useCallback(async () => {
    // 여긴 이대로 두고 개발자가 조정하는게 맞는것 같다.
    await handleCommit1();
    await handleCommit2();
  }, [handleCommit1, handleCommit2]);

  const handleGrid1Initialized = useCallback((grid: FlexGrid) => {
    handleGrid1InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MMASM_MENU_HEADER_TREE,
    });
  }, [handleGrid1InitBase]);

  const handleGrid2Initialized = useCallback((grid: FlexGrid) => {
    handleGrid2InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MMASM_MENU_HEADER_TREE,
    });
  }, [handleGrid2InitBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('My Menu 등록'),
    actions: {
      createCommand: handleCreate1,
      deleteCommand: handleDelete1,
      searchCommand: handleSearchWithFilters,
      commitCommand: handleCommitAll,
      excelCommand: handleExcel1,
    },
  };

  return (
    <DMmasmMenuView
      commonButtonsProps={commonButtonProps}
      searchSection={(
        isSearchComboReady ? <SearchConditionFields
          fields={searchFields}
          values={searchFilters}
          onValuesChange={setSearchFilters}
        /> : '로딩중...'
      )}
      onGrid1Initialized={handleGrid1Initialized}
      onGrid2Initialized={handleGrid2Initialized}
    />
  );
}
