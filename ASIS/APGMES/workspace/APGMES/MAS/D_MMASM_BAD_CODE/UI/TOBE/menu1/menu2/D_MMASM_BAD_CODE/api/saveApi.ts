import { axiosInstance } from '@/utils/axios';

export const save = async (params: any) => {
  // Service: D_MMASM_BAD_CODE-service, Transition: multi
  // InDs: ds_datagrid1=ds_datagrid1:A, OutDs: 
  const response = await axiosInstance.post('/api/v1/services/D_MMASM_BAD_CODE-service/multi', params);
  return response.data;
};
