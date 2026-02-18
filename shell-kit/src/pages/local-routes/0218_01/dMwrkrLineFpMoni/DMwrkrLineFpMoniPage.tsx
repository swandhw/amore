import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import DMwrkrLineFpMoniView from './DMwrkrLineFpMoniView';
import { usePageCrudAuth } from '@/hooks/usePageCrudAuthCheck';
import SearchConditionFields, {
  type SearchConditionFieldConfig,
  type SearchConditionValues,
} from '@/components/ap-wijmo/search/SearchConditionFields';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchDMwrkrLineFpMonis,
  saveDMwrkrLineFpMonis,
  fetchDMwrkrLineFpMoniDatagrid1,
  fetchDMwrkrLineFpMoniDatagrid3,
  fetchDMwrkrLineFpMoniDatagrid4,
  fetchDMwrkrLineFpMoniDatagrid5,
  fetchDMwrkrLineFpMoniDatagrid6,
  fetchDsSearchListResult044Row,
  fetchDsCombo3,
} from './api/dMwrkrLineFpMoniApi';
import { createDMwrkrLineFpMoniRow } from './hooks/useCreateDMwrkrLineFpMoniRow';
import {
  D_MWRKR_LINE_FP_MONI_HEADER_TREE,
  createDatagrid2ColumnDefinition,
  createDatagrid1ColumnDefinition,
  createDatagrid3ColumnDefinition,
  createDatagrid4ColumnDefinition,
  createDatagrid5ColumnDefinition,
  createDatagrid6ColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  DMwrkrLineFpMoniRow,
  DMwrkrLineFpMoniSearchParams,
  DsSearchListResult044Row,
  DsCombo3,
} from './types/DMwrkrLineFpMoniTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'D_MWRKR_LINE_FP_MONI_PAGE';

export default function DMwrkrLineFpMoniPage() {

  const i18n = useI18N(PAGE_NAME);
  const pageCrudAuthCheck = usePageCrudAuth(PAGE_NAME);

  const [dsSearchListResult044Row, setDsSearchListResult044Row] = useState<DsSearchListResult044Row[]>([]);
  const [dsCombo3, setDsCombo3] = useState<DsCombo3[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});

  const searchFields = useMemo<SearchConditionFieldConfig[]>(
    () => [
      {
        id: 'combo1',
        label: '포장작업그룹',
        type: 'combo',
        dataSource: dsCombo3,
        dataPathToText: 'wrkAreaNameRe',
        dataPathToValue: 'wrkArea',
        required: false,
      },
      {
        id: 'combo00',
        label: '작업장(별칭)',
        type: 'combo',
        dataSource: dsSearchListResult044Row,
        dataPathToText: 'codeKorName',
        dataPathToValue: 'commCode',
        required: false,
      },
    ],
    [dsCombo3, dsSearchListResult044Row],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [resDsSearchListResult044Row, resDsCombo3] = await Promise.all([
        fetchDsSearchListResult044Row(),
        fetchDsCombo3(),
      ]);

      setDsSearchListResult044Row(resDsSearchListResult044Row.responseBody || []);
      setDsCombo3(resDsCombo3.responseBody || []);
    };

    fetchData();
  }, []);

  const isSearchComboReady = dsCombo3.length > 0 && dsSearchListResult044Row.length > 0;

  const D_MWRKR_LINE_FP_MONI_COLUMNS_1 = useMemo(() => (
    createDatagrid2ColumnDefinition()
  ), []);

  const D_MWRKR_LINE_FP_MONI_COLUMNS_2 = useMemo(() => (
    createDatagrid1ColumnDefinition()
  ), []);

  const D_MWRKR_LINE_FP_MONI_COLUMNS_3 = useMemo(() => (
    createDatagrid3ColumnDefinition()
  ), []);

  const D_MWRKR_LINE_FP_MONI_COLUMNS_4 = useMemo(() => (
    createDatagrid4ColumnDefinition()
  ), []);

  const D_MWRKR_LINE_FP_MONI_COLUMNS_5 = useMemo(() => (
    createDatagrid5ColumnDefinition()
  ), []);

  const D_MWRKR_LINE_FP_MONI_COLUMNS_6 = useMemo(() => (
    createDatagrid6ColumnDefinition()
  ), []);

  const {
    handleSearch: handleSearch1,
    handleCreate: handleCreate1,
    handleDelete: handleDelete1,
    handleCommit: handleCommit1,
    handleExcel: handleExcel1,
    handleGridInitialized: handleGrid1InitBase,
  } = useGrid(
    createDMwrkrLineFpMoniRow,
    fetchDMwrkrLineFpMonis,
    saveDMwrkrLineFpMonis,
    {
      columns: D_MWRKR_LINE_FP_MONI_COLUMNS_1,
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
    createDMwrkrLineFpMoniRow,
    fetchDMwrkrLineFpMoniDatagrid1,
    saveDMwrkrLineFpMonis,
    {
      columns: D_MWRKR_LINE_FP_MONI_COLUMNS_2,
      pageName: PAGE_NAME,
      gridName: 'grid2',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const {
    handleSearch: handleSearch3,
    handleCreate: handleCreate3,
    handleDelete: handleDelete3,
    handleCommit: handleCommit3,
    handleExcel: handleExcel3,
    handleGridInitialized: handleGrid3InitBase,
  } = useGrid(
    createDMwrkrLineFpMoniRow,
    fetchDMwrkrLineFpMoniDatagrid3,
    saveDMwrkrLineFpMonis,
    {
      columns: D_MWRKR_LINE_FP_MONI_COLUMNS_3,
      pageName: PAGE_NAME,
      gridName: 'grid3',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const {
    handleSearch: handleSearch4,
    handleCreate: handleCreate4,
    handleDelete: handleDelete4,
    handleCommit: handleCommit4,
    handleExcel: handleExcel4,
    handleGridInitialized: handleGrid4InitBase,
  } = useGrid(
    createDMwrkrLineFpMoniRow,
    fetchDMwrkrLineFpMoniDatagrid4,
    saveDMwrkrLineFpMonis,
    {
      columns: D_MWRKR_LINE_FP_MONI_COLUMNS_4,
      pageName: PAGE_NAME,
      gridName: 'grid4',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const {
    handleSearch: handleSearch5,
    handleCreate: handleCreate5,
    handleDelete: handleDelete5,
    handleCommit: handleCommit5,
    handleExcel: handleExcel5,
    handleGridInitialized: handleGrid5InitBase,
  } = useGrid(
    createDMwrkrLineFpMoniRow,
    fetchDMwrkrLineFpMoniDatagrid5,
    saveDMwrkrLineFpMonis,
    {
      columns: D_MWRKR_LINE_FP_MONI_COLUMNS_5,
      pageName: PAGE_NAME,
      gridName: 'grid5',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const {
    handleSearch: handleSearch6,
    handleCreate: handleCreate6,
    handleDelete: handleDelete6,
    handleCommit: handleCommit6,
    handleExcel: handleExcel6,
    handleGridInitialized: handleGrid6InitBase,
  } = useGrid(
    createDMwrkrLineFpMoniRow,
    fetchDMwrkrLineFpMoniDatagrid6,
    saveDMwrkrLineFpMonis,
    {
      columns: D_MWRKR_LINE_FP_MONI_COLUMNS_6,
      pageName: PAGE_NAME,
      gridName: 'grid6',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const handleSearchWithFilters = useCallback(() => {
    const params: DMwrkrLineFpMoniSearchParams = {
      combo1: typeof searchFilters.combo1 === 'string' ? searchFilters.combo1 : null,
      combo00: typeof searchFilters.combo00 === 'string' ? searchFilters.combo00 : null,
    };
    handleSearch1(params);
    handleSearch2(params);
    handleSearch3(params);
    handleSearch4(params);
    handleSearch5(params);
    handleSearch6(params);
  }, [handleSearch1, handleSearch2, handleSearch3, handleSearch4, handleSearch5, handleSearch6, searchFilters]);

  const handleCommitAll = useCallback(async () => {
    await handleCommit1();
    await handleCommit2();
    await handleCommit3();
    await handleCommit4();
    await handleCommit5();
    await handleCommit6();
  }, [handleCommit1, handleCommit2, handleCommit3, handleCommit4, handleCommit5, handleCommit6]);

  const handleGrid1Initialized = useCallback((grid: FlexGrid) => {
    handleGrid1InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MWRKR_LINE_FP_MONI_HEADER_TREE,
    });
  }, [handleGrid1InitBase]);

  const handleGrid2Initialized = useCallback((grid: FlexGrid) => {
    handleGrid2InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MWRKR_LINE_FP_MONI_HEADER_TREE,
    });
  }, [handleGrid2InitBase]);

  const handleGrid3Initialized = useCallback((grid: FlexGrid) => {
    handleGrid3InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MWRKR_LINE_FP_MONI_HEADER_TREE,
    });
  }, [handleGrid3InitBase]);

  const handleGrid4Initialized = useCallback((grid: FlexGrid) => {
    handleGrid4InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MWRKR_LINE_FP_MONI_HEADER_TREE,
    });
  }, [handleGrid4InitBase]);

  const handleGrid5Initialized = useCallback((grid: FlexGrid) => {
    handleGrid5InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MWRKR_LINE_FP_MONI_HEADER_TREE,
    });
  }, [handleGrid5InitBase]);

  const handleGrid6Initialized = useCallback((grid: FlexGrid) => {
    handleGrid6InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MWRKR_LINE_FP_MONI_HEADER_TREE,
    });
  }, [handleGrid6InitBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('포장라인 공정 F/P 모니터링'),
    can: pageCrudAuthCheck.can,
    actions: {
      createCommand: handleCreate1,
      deleteCommand: handleDelete1,
      searchCommand: handleSearchWithFilters,
      commitCommand: handleCommitAll,
      excelCommand: handleExcel1,
    },
  };

  return (
    <DMwrkrLineFpMoniView
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
      onGrid3Initialized={handleGrid3Initialized}
      onGrid4Initialized={handleGrid4Initialized}
      onGrid5Initialized={handleGrid5Initialized}
      onGrid6Initialized={handleGrid6Initialized}
    />
  );
}
