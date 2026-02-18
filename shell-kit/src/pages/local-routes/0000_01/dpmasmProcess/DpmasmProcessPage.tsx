import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';

import SearchConditionFields, {
  type SearchConditionFieldConfig,
  type SearchConditionValues,
} from '@/components/ap-wijmo/search/SearchConditionFields';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import { useCloseGuardContext, useCloseGuardTabId } from '@/components/close-guard/CloseGuardHooks';

import DpmasmProcessView from './DpmasmProcessView';
import {
  fetchDsCudCiOptions,
  fetchDsPlantOptions,
  fetchDsPrdCiOptions,
  fetchDsProcCdOptionsByFindProcCode,
  fetchDsProcTypeOptions,
  fetchProcDtlRowsByFindProcDtl,
  fetchProcRowsByFindProc,
  fetchTab2RowsByFindT2,
  saveProcDtlRowsBySaveProcDtl,
  saveProcRowsBySaveProc,
} from './api/dpmasmProcessApi';
import {
  createProcDtlGridColumns,
  createProcGridColumns,
  createTab2GridColumns,
} from './hooks/useCreateGridColumns';
import { createProcDtlRow, createProcRow, createTab2Row } from './hooks/useCreateRows';
import { useI18N } from '@/i18n/useI18N';
import type {
  DpmasmProcessSearchParams,
  DsCudCiOption,
  DsPlantOption,
  DsPrdCiOption,
  DsProcCdOption,
  DsProcDtlRow,
  DsProcRow,
  DsProcTypeOption,
  DsTab2Row,
} from './types/DpmasmProcessTypes';
import { usePageCrudAuth } from '@/hooks/usePageCrudAuthCheck';
import type { CommonButtonResultType, CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';

const TAB_REGISTER = 'register';
const TAB_STATUS = 'status';
const PAGE_NAME = 'DPMASM_PROCESS_PAGE';

const getFilterValue = (filters: SearchConditionValues, key: string) => {
  const value = filters[key];
  return typeof value === 'string' ? value : null;
};

export default function DpmasmProcessPage() {
  const i18n = useI18N(PAGE_NAME);
  const pageCrudAuthCheck = usePageCrudAuth(PAGE_NAME);

  const [activeTab, setActiveTab] = useState(TAB_REGISTER);
  const [activeGridKey, setActiveGridKey] = useState<'proc' | 'procDtl'>('proc');
  // 초기값은 여기서만 설정해야 한다.
  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({
    prdCi: 'SC',
    procCode: null,
    cudCi: null,
  });
  const [procGrid, setProcGrid] = useState<FlexGrid | null>(null);
  const [procDtlGrid, setProcDtlGrid] = useState<FlexGrid | null>(null);

  const [dsPlantOptions, setDsPlantOptions] = useState<DsPlantOption[]>([]);
  const [dsPrdCiOptions, setDsPrdCiOptions] = useState<DsPrdCiOption[]>([]);
  const [dsProcTypeOptions, setDsProcTypeOptions] = useState<DsProcTypeOption[]>([]);
  const [dsCudCiOptions, setDsCudCiOptions] = useState<DsCudCiOption[]>([]);
  const [dsProcCdOptions, setDsProcCdOptions] = useState<DsProcCdOption[]>([]);

  const procGridColumns = useMemo(
    () =>
      createProcGridColumns({
        dsPlantOptions,
        dsPrdCiOptions,
        dsCudCiOptions,
      }),
    [dsPlantOptions, dsPrdCiOptions, dsCudCiOptions],
  );

  const procDtlGridColumns = useMemo(
    () =>
      createProcDtlGridColumns({
        dsPlantOptions,
        dsPrdCiOptions,
        dsProcCdOptions,
        dsProcTypeOptions,
        dsCudCiOptions,
      }),
    [
      dsPlantOptions,
      dsPrdCiOptions,
      dsProcCdOptions,
      dsProcTypeOptions,
      dsCudCiOptions,
    ],
  );

  const tab2GridColumns = useMemo(
    () =>
      createTab2GridColumns({
        dsPlantOptions,
        dsPrdCiOptions,
        dsProcTypeOptions,
      }),
    [dsPlantOptions, dsPrdCiOptions, dsProcTypeOptions],
  );

  const {
    handleSearch: handleSearchProcDtl,
    handleCreate: handleCreateProcDtl,
    handleCommit: handleCommitProcDtl,
    handleDelete: handleDeleteProcDtl,
    handleGridInitialized: handleProcDtlGridInitialized,
  } = useGrid<DsProcDtlRow, DpmasmProcessSearchParams>(
    createProcDtlRow,
    fetchProcDtlRowsByFindProcDtl,
    saveProcDtlRowsBySaveProcDtl,
    {
      pageName: PAGE_NAME,
      gridName: 'procDtlGrid',
      columns: procDtlGridColumns,
      enableCloseGuard: true,
    }
  );

  const filterPayload = useMemo<DpmasmProcessSearchParams>(() => {
    return {
      prdCi: getFilterValue(searchFilters, 'prdCi'),
      procCode: getFilterValue(searchFilters, 'procCode'),
      cudCi: getFilterValue(searchFilters, 'cudCi'),
    };
  }, [searchFilters]);

  const handleProcSelectionChanged = useCallback((grid: FlexGrid) => {
    const selected = grid.selectedItems?.[0] as DsProcRow | undefined;
    if (!selected) return;
    handleSearchProcDtl({
      plant: selected.plant,
      prdCi: selected.prdCi,
      procCode: selected.procCode,
      cudCi: filterPayload.cudCi,
    });
  }, [handleSearchProcDtl, filterPayload.cudCi]);

  const {
    handleSearch: handleSearchProc,
    handleCreate: handleCreateProc,
    handleCommit: handleCommitProc,
    handleGridInitialized: handleProcGridInitialized,
    handleExcel,
  } = useGrid<DsProcRow, DpmasmProcessSearchParams>(
    createProcRow,
    fetchProcRowsByFindProc,
    saveProcRowsBySaveProc,
    {
      pageName: PAGE_NAME,
      gridName: 'procGrid',
      columns: procGridColumns,
      onSelectionChanged: handleProcSelectionChanged,
      enableCloseGuard: true,
    }
  );

  const {
    handleSearch: handleSearchTab2,
    handleGridInitialized: handleTab2GridInitialized,
  } = useGrid<DsTab2Row, DpmasmProcessSearchParams>(
    createTab2Row,
    fetchTab2RowsByFindT2,
    async () => ({ result: 'true', message: 'noop' }),
    {
      pageName: PAGE_NAME,
      gridName: 'tab2Grid',
      columns: tab2GridColumns,
      enableCloseGuard: true,
    }
  );

  const closeGuard = useCloseGuardContext();
  const closeGuardTabId = useCloseGuardTabId();



  const searchFields = useMemo<SearchConditionFieldConfig[]>(
    () => {
      return [
      {
        id: 'prdCi',
        label: '제품구분',
        type: 'combo',
        dataSource: dsPrdCiOptions,
        dataPathToText: 'codeKorNameRe',
        dataPathToValue: 'commCode',
        required: false,
        defaultValue: 'MK',
      },
      {
        id: 'procCode',
        label: '대공정',
        type: 'combo',
        dataSource: dsProcCdOptions,
        dataPathToText: 'procName',
        dataPathToValue: 'procCode',
        required: false,
        defaultValue: null,
      },
      {
        id: 'cudCi',
        label: '사용유무',
        type: 'combo',
        dataSource: dsCudCiOptions,
        dataPathToText: 'codeKorName',
        dataPathToValue: 'commCode',
        required: false,
        defaultValue: null,
      },
    ] },
    [dsPrdCiOptions, dsProcCdOptions, dsCudCiOptions],
  );

  const handleSearchWithFilters = useCallback(async (): Promise<CommonButtonResultType> => {
    if (activeTab === TAB_STATUS) {
      return handleSearchTab2(filterPayload);
    }

    await handleSearchProc(filterPayload);

    if (filterPayload.procCode) {
      await handleSearchProcDtl(filterPayload);
    }
    return {
      result: true,
    }
  }, [activeTab, filterPayload, handleSearchProc, handleSearchProcDtl, handleSearchTab2]);

  const handleSearchWithGuard = useCallback((): Promise<CommonButtonResultType> => {
    const runSearch = () => {
      return handleSearchWithFilters();
    };

    if (!closeGuard || !closeGuardTabId) {
      return runSearch();
    }

    closeGuard.attemptSearch(closeGuardTabId, runSearch);
    return Promise.resolve({ result: true });
  }, [closeGuard, closeGuardTabId, handleSearchWithFilters]);

  const handleCreate = useCallback(() => {
    if (activeTab !== TAB_REGISTER) return;
    if (activeGridKey === 'proc') {
      handleCreateProc();
      return;
    }
    handleCreateProcDtl();
  }, [activeGridKey, activeTab, handleCreateProc, handleCreateProcDtl]);

  const handleCommit = useCallback(async (): Promise<CommonButtonResultType> => {
    if (activeTab !== TAB_REGISTER) 
      return {
        result: true,
      };
    await handleCommitProc();
    await handleCommitProcDtl();
    return {
      result: true,
    }
  }, [activeTab, handleCommitProc, handleCommitProcDtl]);

  const attachProcGridHandlers = useCallback(
    (grid: FlexGrid) => {
      handleProcGridInitialized(grid);
      setProcGrid(grid);
    },
    [handleProcGridInitialized],
  );

  const attachProcDtlGridHandlers = useCallback(
    (grid: FlexGrid) => {
      handleProcDtlGridInitialized(grid);
      setProcDtlGrid(grid);
    },
    [handleProcDtlGridInitialized],
  );

  // proc그리드 행 선택 변경 이벤트 등록 및 해제.
  useEffect(() => {
    if (!procGrid) return;

    const grid = procGrid;
    const host = grid.hostElement;
    const handleFocus = () => setActiveGridKey('proc');

    host.addEventListener('focusin', handleFocus);

    return () => {
      host.removeEventListener('focusin', handleFocus);
    };
  }, [procGrid]);

  // dtil 그리드 행 선택 변경 이벤트 등록 및 해제.
  useEffect(() => {
    if (!procDtlGrid) return;

    const grid = procDtlGrid;
    const host = grid.hostElement;
    const handleFocus = () => setActiveGridKey('procDtl');
    host.addEventListener('focusin', handleFocus);

    return () => {
      host.removeEventListener('focusin', handleFocus);
    };
  }, [procDtlGrid]);

  // 기본 콤보 데이터 조회.
  useEffect(() => {
    const fetchData = async () => {
      const [plantOptions, prdCiOptions, procTypeOptions, cudCiOptions] = await Promise.all([
        fetchDsPlantOptions(),
        fetchDsPrdCiOptions(),
        fetchDsProcTypeOptions(),
        fetchDsCudCiOptions(),
      ]);
      setDsPlantOptions(plantOptions.responseBody || []);
      setDsPrdCiOptions(prdCiOptions.responseBody || []);
      setDsProcTypeOptions(procTypeOptions.responseBody || []);
      setDsCudCiOptions(cudCiOptions.responseBody || []); 

      
    };
    
    fetchData();
  
  }, []);

  const isSearchComboReady = dsPrdCiOptions.length > 0 && dsProcCdOptions.length > 0 && dsCudCiOptions.length > 0;


  // 제품구분 필터 변경 체크
  useEffect(() => {
    const prdCi = filterPayload.prdCi;
    fetchDsProcCdOptionsByFindProcCode({ prdCi }).then((response) => {
      if (response.responseBody) {
        setDsProcCdOptions(response.responseBody);
      }
    });
  }, [filterPayload.prdCi]);

  useEffect(() => {
    void handleSearchWithFilters();
  }, [activeTab, handleSearchWithFilters]);



  const commonButtonProps : CommonButtonsProps = {
    title: i18n.t('표준 공정 등록'),
    can: pageCrudAuthCheck.can,
    actions: {
      createCommand: handleCreate,
      deleteCommand: handleDeleteProcDtl,
      searchCommand: handleSearchWithGuard,
      commitCommand: handleCommit,
      excelCommand: handleExcel,
    }
  }

  return (
    <DpmasmProcessView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchSection={
        isSearchComboReady ? <SearchConditionFields
          fields={searchFields}
          values={searchFilters}
          onValuesChange={setSearchFilters}
        /> : <>로딩중...</>
      }
      t={i18n.t}
      commonButtonsProps={commonButtonProps}
      onProcGridInitialized={attachProcGridHandlers}
      onProcDtlGridInitialized={attachProcDtlGridHandlers}
      onTab2GridInitialized={handleTab2GridInitialized}
    />
  );
}
