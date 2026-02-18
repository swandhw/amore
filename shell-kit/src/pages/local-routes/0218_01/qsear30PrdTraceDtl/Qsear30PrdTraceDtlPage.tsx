import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import Qsear30PrdTraceDtlView from './Qsear30PrdTraceDtlView';
import SearchConditionFields, {
  type SearchConditionFieldConfig,
  type SearchConditionValues,
} from '@/components/ap-wijmo/search/SearchConditionFields';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchQsear30PrdTraceDtls,
  saveQsear30PrdTraceDtls,
  fetchQsear30PrdTraceDtlGrdRoh6,
  fetchQsear30PrdTraceDtlGrdHal3,
  fetchQsear30PrdTraceDtlGrdFer1,
  fetchDsAuthPrdCI,
} from './api/qsear30PrdTraceDtlApi';
import { createQsear30PrdTraceDtlRow } from './hooks/useCreateQsear30PrdTraceDtlRow';
import {
  QSEAR_30_PRD_TRACE_DTL_HEADER_TREE,
  createGrdHal12ColumnDefinition,
  createGrdRoh6ColumnDefinition,
  createGrdHal3ColumnDefinition,
  createGrdFer1ColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  Qsear30PrdTraceDtlRow,
  Qsear30PrdTraceDtlSearchParams,
  DsAuthPrdCI,
} from './types/Qsear30PrdTraceDtlTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'QSEAR_30_PRD_TRACE_DTL_PAGE';

export default function Qsear30PrdTraceDtlPage() {

  const i18n = useI18N(PAGE_NAME);

  const [dsAuthPrdCI, setDsAuthPrdCI] = useState<DsAuthPrdCI[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});

  const searchFields = useMemo<SearchConditionFieldConfig[]>(
    () => [
      {
        id: 'cmbAuthprdci',
        label: '권한사업장',
        type: 'combo',
        dataSource: dsAuthPrdCI,
        dataPathToText: 'codeName',
        dataPathToValue: 'userDefine0',
        required: false,
      },
    ],
    [dsAuthPrdCI],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [resDsAuthPrdCI] = await Promise.all([
        fetchDsAuthPrdCI(),
      ]);

      setDsAuthPrdCI(resDsAuthPrdCI.responseBody || []);
    };

    fetchData();
  }, []);

  const isSearchComboReady = dsAuthPrdCI.length > 0;

  const QSEAR_30_PRD_TRACE_DTL_COLUMNS_1 = useMemo(() => (
    createGrdHal12ColumnDefinition()
  ), []);

  const QSEAR_30_PRD_TRACE_DTL_COLUMNS_2 = useMemo(() => (
    createGrdRoh6ColumnDefinition()
  ), []);

  const QSEAR_30_PRD_TRACE_DTL_COLUMNS_3 = useMemo(() => (
    createGrdHal3ColumnDefinition()
  ), []);

  const QSEAR_30_PRD_TRACE_DTL_COLUMNS_4 = useMemo(() => (
    createGrdFer1ColumnDefinition()
  ), []);

  const {
    handleSearch: handleSearch1,
    handleCreate: handleCreate1,
    handleDelete: handleDelete1,
    handleCommit: handleCommit1,
    handleExcel: handleExcel1,
    handleGridInitialized: handleGrid1InitBase,
  } = useGrid(
    createQsear30PrdTraceDtlRow,
    fetchQsear30PrdTraceDtls,
    saveQsear30PrdTraceDtls,
    {
      columns: QSEAR_30_PRD_TRACE_DTL_COLUMNS_1,
      pageName: PAGE_NAME,
      gridName: 'grid1',
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
    createQsear30PrdTraceDtlRow,
    fetchQsear30PrdTraceDtlGrdRoh6,
    saveQsear30PrdTraceDtls,
    {
      columns: QSEAR_30_PRD_TRACE_DTL_COLUMNS_2,
      pageName: PAGE_NAME,
      gridName: 'grid2',
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
    createQsear30PrdTraceDtlRow,
    fetchQsear30PrdTraceDtlGrdHal3,
    saveQsear30PrdTraceDtls,
    {
      columns: QSEAR_30_PRD_TRACE_DTL_COLUMNS_3,
      pageName: PAGE_NAME,
      gridName: 'grid3',
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
    createQsear30PrdTraceDtlRow,
    fetchQsear30PrdTraceDtlGrdFer1,
    saveQsear30PrdTraceDtls,
    {
      columns: QSEAR_30_PRD_TRACE_DTL_COLUMNS_4,
      pageName: PAGE_NAME,
      gridName: 'grid4',
    },
  );

  const handleSearchWithFilters = useCallback(() => {
    const params: Qsear30PrdTraceDtlSearchParams = {
      cmbAuthprdci: typeof searchFilters.cmbAuthprdci === 'string' ? searchFilters.cmbAuthprdci : null,
    };
    handleSearch1(params);
    handleSearch2(params);
    handleSearch3(params);
    handleSearch4(params);
  }, [handleSearch1, handleSearch2, handleSearch3, handleSearch4, searchFilters]);

  const handleCommitAll = useCallback(async () => {
    await handleCommit1();
    await handleCommit2();
    await handleCommit3();
    await handleCommit4();
  }, [handleCommit1, handleCommit2, handleCommit3, handleCommit4]);

  const handleGrid1Initialized = useCallback((grid: FlexGrid) => {
    handleGrid1InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_30_PRD_TRACE_DTL_HEADER_TREE,
    });
  }, [handleGrid1InitBase]);

  const handleGrid2Initialized = useCallback((grid: FlexGrid) => {
    handleGrid2InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_30_PRD_TRACE_DTL_HEADER_TREE,
    });
  }, [handleGrid2InitBase]);

  const handleGrid3Initialized = useCallback((grid: FlexGrid) => {
    handleGrid3InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_30_PRD_TRACE_DTL_HEADER_TREE,
    });
  }, [handleGrid3InitBase]);

  const handleGrid4Initialized = useCallback((grid: FlexGrid) => {
    handleGrid4InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_30_PRD_TRACE_DTL_HEADER_TREE,
    });
  }, [handleGrid4InitBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('제품추적조회(상세)'),
    actions: {
      createCommand: handleCreate1,
      deleteCommand: handleDelete1,
      searchCommand: handleSearchWithFilters,
      commitCommand: handleCommitAll,
      excelCommand: handleExcel1,
    },
  };

  return (
    <Qsear30PrdTraceDtlView
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
    />
  );
}
