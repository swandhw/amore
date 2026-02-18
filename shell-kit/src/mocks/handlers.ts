import { authHandlers } from '@/api/auth/mocks';
import { commonHandlers } from '@/api/common/mocks';
import { basicInfoOverviewHandlers } from '@/pages/basic-infos/basicInfoOverview/api/mocks';
import { badCodeRegisterHandlers } from '@/pages/basic-infos/badCodeRegister/api/mocks';
import { newProductRegisterHandlers } from '@/pages/basic-infos/newProductRegister/api/mocks';
import { dpmasmProcessHandlers } from '@/pages/basic-infos/dpmasmProcess/api/mocks';
import { packagingInfoOverviewHandlers } from '@/pages/packaging-infos/PackagingInfoOverview/api/mocks';
import { productionInfoOverviewHandlers } from '@/pages/production-infos/api/mocks';

export const handlers = [
  ...authHandlers,
  ...commonHandlers,
  ...basicInfoOverviewHandlers,
  ...badCodeRegisterHandlers,
  ...newProductRegisterHandlers,
  ...dpmasmProcessHandlers,
  ...packagingInfoOverviewHandlers,
  ...productionInfoOverviewHandlers,
];
