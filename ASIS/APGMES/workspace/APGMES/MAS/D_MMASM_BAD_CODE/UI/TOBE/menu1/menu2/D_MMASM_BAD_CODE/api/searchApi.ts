import { axiosInstance } from '@/utils/axios';

export const search = async (params: any) => {
  // Service: D_MMASM_BAD_CODE-service, Transition: find
  // InDs: , OutDs: ds_datagrid1=dsr_SearchListResult
  const response = await axiosInstance.post('/api/v1/services/D_MMASM_BAD_CODE-service/find', params);
  return response.data;
};
