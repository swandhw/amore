import { apiGet, apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { DMmasmMenuRow, DMmasmMenuSearchParams, DsCombo2, DsCombo1 } from '../types/DMmasmMenuTypes';
import type { ApiResponse } from '@/api/httpClient';

const D_MMASM_MENU_DATA: DMmasmMenuRow[] = [
];

export const fetchDMmasmMenus = async (params?: DMmasmMenuSearchParams) => {
  const combo2 = normalizeFilterValue(params?.combo2);
  const combo1 = normalizeFilterValue(params?.combo1);

  const filtered = D_MMASM_MENU_DATA.filter((row) => {
    return true;
  });

  const response: ApiResponse<DMmasmMenuRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

/*
  original source

this.button3_onclick = function(obj:Button,  e:nexacro.ClickEventInfo)
{
	// 실제로 변경된 데이터가 있는지 확인.
	var j = this.gfn_IsEmptyDataSetColumn(this, this.ds_datagrid1, []);
	var k = this.gfn_IsEmptyDataSetColumn(this, this.ds_datagrid2, []);
	if (j>0 || k>0)
	{
		var sSvcNm = "D_MMASM_MENU-service"; 
		var sTransition = "multi";              
		var sInDataSet = "ds_datagrid1=ds_datagrid1 ds_datagrid2=ds_datagrid2";
		var sOutDataSet = "";	
		var sArgument = this.gfn_GetTranInfo("CHNG_ID|PROC_ID|PLANT"); //변수값들;
		this.gfn_Transaction(this, "multi", sTransition, sSvcNm ,sInDataSet, sOutDataSet, sArgument, "fn_CallBack", true,false,false);
	}
	else
	{
		this.gfn_Message("1353", "OK"); // 수정 또는 등록 된 데이터가 없습니다. 다시 확인해 주십시요.
	}
}

*/
export const saveDMmasmMenus = async (dsName: string, payload: DMmasmMenuRow[]) => {
  // 이름도 좋고 잘 된것 같습니다. API 주소를 사용해주시고, mock.ts 에도 post 로 만들어 주세요.
  return apiPost<DMmasmMenuRow>('/d-mmasm-menu', dsName, payload);
}

export const fetchDMmasmMenuDatagrid2 = async (params?: DMmasmMenuSearchParams) => {
  const combo2 = normalizeFilterValue(params?.combo2);
  const combo1 = normalizeFilterValue(params?.combo1);

  const response: ApiResponse<DMmasmMenuRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

/*
  original source
 	var codeArr = [   
					  ["QMS_COMM_CODE_LANG_PLANT"	, "MES01"	, "find01"		, "combo1"					, "SearchListResult"			] // 화면레벨 1
					, ["QMS_COMM_CODE_LANG_PLANT"	, "MES02"	, "find01"		, "combo2"					, "SearchListResult"			] // 화면레벨 2
				];
	this.gfn_QmsCode_Transaction(this, codeArr);
*/
export const fetchDsCombo2 = async () => {
  return apiGet<DsCombo2[]>('basic-infos/ai-transform/d-mmasm-menu/options/combo2');
};

/*
  original source
 	var codeArr = [   
					  ["QMS_COMM_CODE_LANG_PLANT"	, "MES01"	, "find01"		, "combo1"					, "SearchListResult"			] // 화면레벨 1
					, ["QMS_COMM_CODE_LANG_PLANT"	, "MES02"	, "find01"		, "combo2"					, "SearchListResult"			] // 화면레벨 2
				];
	this.gfn_QmsCode_Transaction(this, codeArr);
*/
export const fetchDsCombo1 = async () => {
  return apiGet<DsCombo1[]>('basic-infos/ai-transform/d-mmasm-menu/options/combo1');
};

