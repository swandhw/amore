import type { FlexGrid } from '@mescius/wijmo.grid';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewFill } from '@/components/layout/ViewFill';
import CommonButtons from '@/components/common-control/CommonButtons';

import { DpmasmProcessStatusTabView } from './DpmasmProcessStatusTabView';
import { DpmasmProcessRegisterTabView } from './DpmasmProcessRegisterTabView';
import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';

export type DpmasmProcessViewProps = {
  t: (key: string) => string;
  activeTab: string;
  onTabChange: (value: string) => void;
  searchSection?: React.ReactNode;
  commonButtonsProps: CommonButtonsProps;
  onProcGridInitialized: (grid: FlexGrid) => void;
  onProcDtlGridInitialized: (grid: FlexGrid) => void;
  onTab2GridInitialized: (grid: FlexGrid) => void;
};

const DpmasmProcessView = (props: DpmasmProcessViewProps) => {
  const {
    t,
    activeTab,
    onTabChange,
    searchSection,
    commonButtonsProps,
    onProcGridInitialized,
    onProcDtlGridInitialized,
    onTab2GridInitialized,
  } = props;

  return (
    <ViewFill variant="root">
      <CommonButtons
        {...commonButtonsProps}
      />
      <header className="shrink-0">
        {searchSection}
      </header>
        <Tabs value={activeTab} onValueChange={onTabChange} >
          <TabsList>
            <TabsTrigger value="register">{t('표준공정 등록')}</TabsTrigger>
            <TabsTrigger value="status">{t('표준공정 현황')}</TabsTrigger>
          </TabsList>
          <TabsContent value="register" keepMounted >
            <DpmasmProcessRegisterTabView
              onProcGridInitialized={onProcGridInitialized}
              onProcDtlGridInitialized={onProcDtlGridInitialized}
            />
          </TabsContent>
          <TabsContent value="status" keepMounted >
              <DpmasmProcessStatusTabView
                onTab2GridInitialized={onTab2GridInitialized}
              />
          </TabsContent>
        </Tabs>
    </ViewFill>
  );
};

export default DpmasmProcessView;
