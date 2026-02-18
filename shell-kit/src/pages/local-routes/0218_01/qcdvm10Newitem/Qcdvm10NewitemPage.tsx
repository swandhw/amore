import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';
import Qcdvm10NewitemView from './Qcdvm10NewitemView';
import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';

import {
  fetchQcdvm10Newitems,
  saveQcdvm10Newitems,
} from './api/qcdvm10NewitemApi';
import { createQcdvm10NewitemRow } from './hooks/useCreateQcdvm10NewitemRow';
import {
  QCDVM_10_NEWITEM_HEADER_TREE,
  createGrdNewitemListColumnDefinition,
} from './hooks/useCreateGridColumn';

import type {
  Qcdvm10NewitemRow,
} from './types/Qcdvm10NewitemTypes';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';
import { useI18N } from '@/i18n/useI18N';

const PAGE_NAME = 'QCDVM_10_NEWITEM_PAGE';

export default function Qcdvm10NewitemPage() {

  const i18n = useI18N(PAGE_NAME);


  const QCDVM_10_NEWITEM_COLUMNS = useMemo(() => (
    createGrdNewitemListColumnDefinition()
  ), []);

  const {
    handleSearch,
    handleCreate,
    handleDelete,
    handleCommit,
    handleExcel,
    handleGridInitialized: handleGridInitializedBase,
  } = useGrid(
    createQcdvm10NewitemRow,
    fetchQcdvm10Newitems,
    saveQcdvm10Newitems,
    {
      columns: QCDVM_10_NEWITEM_COLUMNS,
      pageName: PAGE_NAME,
      gridName: 'mainGrid',
    },
  );

  const handleGridInitialized = useCallback((grid: FlexGrid) => {
    handleGridInitializedBase(grid);
    attachHeaderTreeDrag(grid, {
      tree: QCDVM_10_NEWITEM_HEADER_TREE,
    });
  }, [handleGridInitializedBase]);

  const commonButtonProps: CommonButtonsProps = {
    title: i18n.t('(내용물) 신제품 관리'),
    actions: {
      createCommand: handleCreate,
      deleteCommand: handleDelete,
      searchCommand: handleSearch,
      commitCommand: handleCommit,
      excelCommand: handleExcel,
    },
  };

  return (
    <Qcdvm10NewitemView
      commonButtonsProps={commonButtonProps}
      onGridInitialized={handleGridInitialized}
    />
  );
}
