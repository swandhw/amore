import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import Qsear35ContColorChartNView from './Qsear35ContColorChartNView';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchQsear35ContColorChartNs,
  saveQsear35ContColorChartNs,
  fetchQsear35ContColorChartNGrid02,
  fetchQsear35ContColorChartNGrid03,
} from './api/qsear35ContColorChartNApi';
import { createQsear35ContColorChartNRow } from './hooks/useCreateQsear35ContColorChartNRow';
import {
  QSEAR_35_CONT_COLOR_CHART_N_HEADER_TREE,
  createGrdMainMatrColumnDefinition,
  createGrid02ColumnDefinition,
  createGrid03ColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  Qsear35ContColorChartNRow,
} from './types/Qsear35ContColorChartNTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'QSEAR_35_CONT_COLOR_CHART_N_PAGE';

export default function Qsear35ContColorChartNPage() {

  const i18n = useI18N(PAGE_NAME);


  const QSEAR_35_CONT_COLOR_CHART_N_COLUMNS_1 = useMemo(() => (
    createGrdMainMatrColumnDefinition()
  ), []);

  const QSEAR_35_CONT_COLOR_CHART_N_COLUMNS_2 = useMemo(() => (
    createGrid02ColumnDefinition()
  ), []);

  const QSEAR_35_CONT_COLOR_CHART_N_COLUMNS_3 = useMemo(() => (
    createGrid03ColumnDefinition()
  ), []);

  const {
    handleSearch: handleSearch1,
    handleCreate: handleCreate1,
    handleDelete: handleDelete1,
    handleCommit: handleCommit1,
    handleExcel: handleExcel1,
    handleGridInitialized: handleGrid1InitBase,
  } = useGrid(
    createQsear35ContColorChartNRow,
    fetchQsear35ContColorChartNs,
    saveQsear35ContColorChartNs,
    {
      columns: QSEAR_35_CONT_COLOR_CHART_N_COLUMNS_1,
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
    createQsear35ContColorChartNRow,
    fetchQsear35ContColorChartNGrid02,
    saveQsear35ContColorChartNs,
    {
      columns: QSEAR_35_CONT_COLOR_CHART_N_COLUMNS_2,
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
    createQsear35ContColorChartNRow,
    fetchQsear35ContColorChartNGrid03,
    saveQsear35ContColorChartNs,
    {
      columns: QSEAR_35_CONT_COLOR_CHART_N_COLUMNS_3,
      pageName: PAGE_NAME,
      gridName: 'grid3',
    },
  );

  const handleSearchAll = useCallback(() => {
    handleSearch1();
    handleSearch2();
    handleSearch3();
  }, [handleSearch1, handleSearch2, handleSearch3]);

  const handleCommitAll = useCallback(async () => {
    await handleCommit1();
    await handleCommit2();
    await handleCommit3();
  }, [handleCommit1, handleCommit2, handleCommit3]);

  const handleGrid1Initialized = useCallback((grid: FlexGrid) => {
    handleGrid1InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_35_CONT_COLOR_CHART_N_HEADER_TREE,
    });
  }, [handleGrid1InitBase]);

  const handleGrid2Initialized = useCallback((grid: FlexGrid) => {
    handleGrid2InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_35_CONT_COLOR_CHART_N_HEADER_TREE,
    });
  }, [handleGrid2InitBase]);

  const handleGrid3Initialized = useCallback((grid: FlexGrid) => {
    handleGrid3InitBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QSEAR_35_CONT_COLOR_CHART_N_HEADER_TREE,
    });
  }, [handleGrid3InitBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('내용물별 원료 색차 - 차트(N)'),
    actions: {
      createCommand: handleCreate1,
      deleteCommand: handleDelete1,
      searchCommand: handleSearchAll,
      commitCommand: handleCommitAll,
      excelCommand: handleExcel1,
    },
  };

  return (
    <Qsear35ContColorChartNView
      commonButtonsProps={commonButtonProps}
      onGrid1Initialized={handleGrid1Initialized}
      onGrid2Initialized={handleGrid2Initialized}
      onGrid3Initialized={handleGrid3Initialized}
    />
  );
}
