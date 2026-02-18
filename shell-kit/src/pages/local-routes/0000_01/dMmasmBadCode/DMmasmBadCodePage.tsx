import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import DMmasmBadCodeView from './DMmasmBadCodeView';
import { usePageCrudAuth } from '@/hooks/usePageCrudAuthCheck';
import SearchConditionFields, {
  type SearchConditionFieldConfig,
  type SearchConditionValues,
} from '@/components/ap-wijmo/search/SearchConditionFields';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchDMmasmBadCodesByFind,
  saveDMmasmBadCodesByMulti,
  fetchDsSearchListResult535Row,
  fetchDsSearchListResult14Row,
  fetchDsCombo1,
  fetchDsCombo2,
} from './api/dMmasmBadCodeApi';
import { createDMmasmBadCodeRow } from './hooks/useCreateDMmasmBadCodeRow';
import {
  D_MMASM_BAD_CODE_HEADER_TREE,
  createDatagrid1ColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  DMmasmBadCodeSearchParams,
  DsSearchListResult535Row,
  DsSearchListResult14Row,
  DsCombo1,
  DsCombo2,
} from './types/DMmasmBadCodeTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'D_MMASM_BAD_CODE_PAGE';

export default function DMmasmBadCodePage() {

  const i18n = useI18N(PAGE_NAME);
  const pageCrudAuthCheck = usePageCrudAuth(PAGE_NAME);

  const [dsSearchListResult535Row, setDsSearchListResult535Row] = useState<DsSearchListResult535Row[]>([]);
  const [dsSearchListResult14Row, setDsSearchListResult14Row] = useState<DsSearchListResult14Row[]>([]);
  const [dsCombo1, setDsCombo1] = useState<DsCombo1[]>([]);
  const [dsCombo2, setDsCombo2] = useState<DsCombo2[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});

  const searchFields = useMemo<SearchConditionFieldConfig[]>(
    () => [
      {
        id: 'combo1',
        label: '코드타입',
        type: 'combo',
        dataSource: dsCombo1,
        dataPathToText: 'codeKorNameRe',
        dataPathToValue: 'commCode',
        required: false,
      },
      {
        id: 'combo2',
        label: '사용유무',
        type: 'combo',
        dataSource: dsCombo2,
        dataPathToText: 'codeKorNameRe',
        dataPathToValue: 'commCode',
        required: false,
      },
    ],
    [dsCombo1, dsCombo2],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [resDsSearchListResult535Row, resDsSearchListResult14Row, resDsCombo1, resDsCombo2] = await Promise.all([
        fetchDsSearchListResult535Row(),
        fetchDsSearchListResult14Row(),
        fetchDsCombo1(),
        fetchDsCombo2(),
      ]);

      setDsSearchListResult535Row(resDsSearchListResult535Row.responseBody || []);
      setDsSearchListResult14Row(resDsSearchListResult14Row.responseBody || []);
      setDsCombo1(resDsCombo1.responseBody || []);
      setDsCombo2(resDsCombo2.responseBody || []);
    };

    fetchData();
  }, []);

  const isSearchComboReady = dsCombo1.length > 0 && dsCombo2.length > 0;

  const D_MMASM_BAD_CODE_COLUMNS = useMemo(() => (
    createDatagrid1ColumnDefinition({
      dsSearchListResult535Row: dsSearchListResult535Row,
      dsCombo1: dsCombo1,
      dsSearchListResult14Row: dsSearchListResult14Row,
    })
  ), [dsSearchListResult535Row, dsCombo1, dsSearchListResult14Row]);

  const {
    handleSearch,
    handleCreate,
    handleDelete,
    handleCommit,
    handleExcel,
    handleGridInitialized: handleGridInitializedBase,
  } = useGrid(
    createDMmasmBadCodeRow,
    fetchDMmasmBadCodesByFind,
    saveDMmasmBadCodesByMulti,
    {
      columns: D_MMASM_BAD_CODE_COLUMNS,
      pageName: PAGE_NAME,
      gridName: 'mainGrid',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const handleSearchWithFilters = useCallback(() => {
    const params: DMmasmBadCodeSearchParams = {
      combo1: typeof searchFilters.combo1 === 'string' ? searchFilters.combo1 : null,
      combo2: typeof searchFilters.combo2 === 'string' ? searchFilters.combo2 : null,
    };
    return handleSearch(params);
  }, [handleSearch, searchFilters]);

  const handleGridInitialized = useCallback((grid: FlexGrid) => {
    handleGridInitializedBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_MMASM_BAD_CODE_HEADER_TREE,
    });
  }, [handleGridInitializedBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('조회조건'),
    can: pageCrudAuthCheck.can,
    actions: {
      createCommand: handleCreate,
      deleteCommand: handleDelete,
      searchCommand: handleSearchWithFilters,
      commitCommand: handleCommit,
      excelCommand: handleExcel,
    },
  };

  return (
    <DMmasmBadCodeView
      commonButtonsProps={commonButtonProps}
      searchSection={(
        isSearchComboReady ? <SearchConditionFields
          fields={searchFields}
          values={searchFilters}
          onValuesChange={setSearchFilters}
        /> : '로딩중...'
      )}
      onGridInitialized={handleGridInitialized}
    />
  );
}
