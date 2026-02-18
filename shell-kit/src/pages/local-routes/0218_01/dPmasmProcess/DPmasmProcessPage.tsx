import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import DPmasmProcessView from './DPmasmProcessView';
import { usePageCrudAuth } from '@/hooks/usePageCrudAuthCheck';
import SearchConditionFields, {
  type SearchConditionFieldConfig,
  type SearchConditionValues,
} from '@/components/ap-wijmo/search/SearchConditionFields';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchDPmasmProcesss,
  saveDPmasmProcesss,
  fetchDPmasmProcessGrdProcdtl,
  fetchDPmasmProcessGrdGridt2,
  fetchDsCudCi,
  fetchDsProcCd,
  fetchDsPrdCi,
  fetchDsProcType,
  fetchDsPlant,
} from './api/dPmasmProcessApi';
import { createDPmasmProcessRow } from './hooks/useCreateDPmasmProcessRow';
import {
  D_PMASM_PROCESS_HEADER_TREE,
  createGrdProcColumnDefinition,
  createGrdProcdtlColumnDefinition,
  createGrdGridt2ColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  DPmasmProcessRow,
  DPmasmProcessSearchParams,
  DsCudCi,
  DsProcCd,
  DsPrdCi,
  DsProcType,
  DsPlant,
} from './types/DPmasmProcessTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'D_PMASM_PROCESS_PAGE';

export default function DPmasmProcessPage() {

  const i18n = useI18N(PAGE_NAME);
  const pageCrudAuthCheck = usePageCrudAuth(PAGE_NAME);

  const [dsCudCi, setDsCudCi] = useState<DsCudCi[]>([]);
  const [dsProcCd, setDsProcCd] = useState<DsProcCd[]>([]);
  const [dsPrdCi, setDsPrdCi] = useState<DsPrdCi[]>([]);
  const [dsProcType, setDsProcType] = useState<DsProcType[]>([]);
  const [dsPlant, setDsPlant] = useState<DsPlant[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});

  const searchFields = useMemo<SearchConditionFieldConfig[]>(
    () => [
      {
        id: 'comboCudci',
        label: '사용유무',
        type: 'combo',
        dataSource: dsCudCi,
        dataPathToText: 'codeKorName',
        dataPathToValue: 'commCode',
        required: false,
      },
      {
        id: 'comboProccd',
        label: '대공정',
        type: 'combo',
        dataSource: dsProcCd,
        dataPathToText: 'procName',
        dataPathToValue: 'procCode',
        required: false,
      },
      {
        id: 'comboPrdci',
        label: '제품구분',
        type: 'combo',
        dataSource: dsPrdCi,
        dataPathToText: 'codeKorNameRe',
        dataPathToValue: 'commCode',
        required: false,
      },
    ],
    [dsCudCi, dsProcCd, dsPrdCi],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [resDsCudCi, resDsProcCd, resDsPrdCi, resDsProcType, resDsPlant] = await Promise.all([
        fetchDsCudCi(),
        fetchDsProcCd(),
        fetchDsPrdCi(),
        fetchDsProcType(),
        fetchDsPlant(),
      ]);

      setDsCudCi(resDsCudCi.responseBody || []);
      setDsProcCd(resDsProcCd.responseBody || []);
      setDsPrdCi(resDsPrdCi.responseBody || []);
      setDsProcType(resDsProcType.responseBody || []);
      setDsPlant(resDsPlant.responseBody || []);
    };

    fetchData();
  }, []);

  const isSearchComboReady = dsCudCi.length > 0 && dsProcCd.length > 0 && dsPrdCi.length > 0;

  const D_PMASM_PROCESS_COLUMNS_1 = useMemo(() => (
    createGrdProcColumnDefinition()
  ), []);

  const D_PMASM_PROCESS_COLUMNS_2 = useMemo(() => (
    createGrdProcdtlColumnDefinition({
      dsPlant: dsPlant,
      dsProcCd: dsProcCd,
      dsProcType: dsProcType,
      dsCudCi: dsCudCi,
    })
  ), [dsPlant, dsProcCd, dsProcType, dsCudCi]);

  const D_PMASM_PROCESS_COLUMNS_3 = useMemo(() => (
    createGrdGridt2ColumnDefinition({
      dsPlant: dsPlant,
    })
  ), [dsPlant]);

  const {
    handleSearch: handleSearch1,
    handleCreate: handleCreate1,
    handleDelete: handleDelete1,
    handleCommit: handleCommit1,
    handleExcel: handleExcel1,
    handleGridInitialized: handleGrid1InitBase,
  } = useGrid(
    createDPmasmProcessRow,
    fetchDPmasmProcesss,
    saveDPmasmProcesss,
    {
      columns: D_PMASM_PROCESS_COLUMNS_1,
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
    createDPmasmProcessRow,
    fetchDPmasmProcessGrdProcdtl,
    saveDPmasmProcesss,
    {
      columns: D_PMASM_PROCESS_COLUMNS_2,
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
    createDPmasmProcessRow,
    fetchDPmasmProcessGrdGridt2,
    saveDPmasmProcesss,
    {
      columns: D_PMASM_PROCESS_COLUMNS_3,
      pageName: PAGE_NAME,
      gridName: 'grid3',
      enableCloseGuard: true,
      enableSearchGuard: true,
    },
  );

  const handleSearchWithFilters = useCallback(() => {
    const params: DPmasmProcessSearchParams = {
      comboCudci: typeof searchFilters.comboCudci === 'string' ? searchFilters.comboCudci : null,
      comboProccd: typeof searchFilters.comboProccd === 'string' ? searchFilters.comboProccd : null,
      comboPrdci: typeof searchFilters.comboPrdci === 'string' ? searchFilters.comboPrdci : null,
    };
    handleSearch1(params);
    handleSearch2(params);
    handleSearch3(params);
  }, [handleSearch1, handleSearch2, handleSearch3, searchFilters]);

  const handleCommitAll = useCallback(async () => {
    await handleCommit1();
    await handleCommit2();
    await handleCommit3();
  }, [handleCommit1, handleCommit2, handleCommit3]);

  const handleGrid1Initialized = useCallback((grid: FlexGrid) => {
    handleGrid1InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_PMASM_PROCESS_HEADER_TREE,
    });
  }, [handleGrid1InitBase]);

  const handleGrid2Initialized = useCallback((grid: FlexGrid) => {
    handleGrid2InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_PMASM_PROCESS_HEADER_TREE,
    });
  }, [handleGrid2InitBase]);

  const handleGrid3Initialized = useCallback((grid: FlexGrid) => {
    handleGrid3InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: D_PMASM_PROCESS_HEADER_TREE,
    });
  }, [handleGrid3InitBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('표준공정 등록'),
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
    <DPmasmProcessView
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
    />
  );
}
