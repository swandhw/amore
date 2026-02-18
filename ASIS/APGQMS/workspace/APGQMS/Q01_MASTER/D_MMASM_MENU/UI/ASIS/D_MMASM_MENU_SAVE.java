package com.Amore.MES.CFG;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.Amore.MES.GEN.MGENS_MSG;
import com.nexacro.xapi.data.DataSet;
import com.poscoict.glueframework.GlueException;
import com.poscoict.glueframework.biz.activity.GlueActivity;
import com.poscoict.glueframework.biz.control.GlueBizControlConstants;
import com.poscoict.glueframework.context.GlueWebContext;
import com.poscoict.glueframework.dao.GlueBadSqlGrammarException;
import com.poscoict.glueframework.dao.GlueDataAccessResourceFailureException;
import com.poscoict.glueframework.dao.GlueDataIntegrityViolationException;
import com.poscoict.glueframework.dao.GlueUncategorizedSQLException;
import com.poscoict.glueframework.dao.jdbc.GlueJdbcDao;
import com.poscoict.glueframework.dao.vo.GlueParameter;

/**
 * My Menu 등록 화면의 데이터를 저장하는 Class이다.
 * @author SSH
 */
public class D_MMASM_MENU_SAVE extends GlueActivity<GlueWebContext> implements MGENS_MSG
{
	/**
	 * My Menu 등록 화면의 데이터를 저장하는 method이다.
	 */
	public String runActivity(GlueWebContext ctx) {
		
		/*
		String[] rowStatus 		= (String[]) ctx.get("rowStatus");
		String[] rownum 		= (String[]) ctx.get("rownum");
		String[] CUD_TYPE 		= (String[]) ctx.get("CUD_TYPE");
		String[] PROGRAM_ID 	= (String[]) ctx.get("PROGRAM_ID");
		*/
		
		String[] USER_ID 		= (String[]) ctx.get("CHNG_ID");
		String[] PROC_ID 		= (String[]) ctx.get("PROC_ID");
		String[] PLANT 			= (String[]) ctx.get("PLANT");
		
		int i = 0;
		
		DataSet ds1 = (DataSet)ctx.get("ds_datagrid1");	
		int ds1Cnt = ds1.getRowCount();
		DataSet ds2 = (DataSet)ctx.get("ds_datagrid2");
		int ds2Cnt = ds2.getRowCount();
		
		//logger.debug("ds1Cnt:"+ds1Cnt );
		//logger.debug("ds2Cnt:" + ds2Cnt);
	
		  
		
		GlueParameter<List<Object>> param =new GlueParameter<List<Object>>();
		List<Object> paramList = new ArrayList<Object>();
		param.setParameter(paramList);
		
		try
		{
			for (int j1 = 0; j1 < ds1Cnt; j1++) {
				if("C".equals(ds1.getString(j1,"CUD_TYPE"))){
					
					paramList.clear();
					paramList.add(ds1.getString(j1,"PROGRAM_ID"));
					paramList.add(USER_ID[0]);
					// insert
					((GlueJdbcDao)getDao("apgqms_dao")).insert("D_MMASM_MENU.INSERT", param);
				}
			}
			
			for (int j2 = 0; j2 < ds2Cnt; j2++) {
				
				
				if("D".equals(ds2.getString(j2,"CUD_TYPE"))){
					
					paramList.clear();
					paramList.add(ds2.getString(j2,"PROGRAM_ID"));
					paramList.add(USER_ID[0]);
					// delete
					((GlueJdbcDao)getDao("apgqms_dao")).insert("D_MMASM_MENU.DELETE", param);
				}
			}
			
			/*
			for (i=0; i<rowStatus.length; i++) 
			{
				paramList.clear();
				paramList.add(PROGRAM_ID[i]);
				paramList.add(USER_ID[0]);
				
				if ("D".equals(CUD_TYPE[i]))
				{
					// delete
					((GlueJdbcDao)getDao("apmes_dao")).insert("D_MMASM_MENU.DELETE", param);
				}
				else if ("C".equals(CUD_TYPE[i]))
				{
					// insert
					((GlueJdbcDao)getDao("apmes_dao")).insert("D_MMASM_MENU.INSERT", param);
				}
			}
			
			*/
		}
		
		catch (GlueException e)
		{
			// 트랜잭션 롤백 수행
			this.rollbackTransaction("tx1");
			
			String UserMsg = null;
			String DetailMsg = null;
			String ErrorMsg = e.getMessage();
	
			// Error log 에 입력할 데이터를 생성한다.
			// 사용자가 입력한 데이터를 string 으로 변환 한다. 
			UserMsg = "" ; //CUD_TYPE[i] + USER_ID[0] + PROGRAM_ID[i];
			
			int INDEX = ErrorMsg.indexOf("ORA");
			if (INDEX != -1){
				ErrorMsg = ErrorMsg.substring(INDEX);
			}
			
			if (e instanceof GlueDataIntegrityViolationException ){
				DetailMsg = BZ_COMMON_ERROR_01 + "   " + BZ_COMMON_01;
			}
			else if (e instanceof GlueBadSqlGrammarException ){
				DetailMsg = BZ_COMMON_ERROR_02 + "   " + BZ_COMMON_01;
			}
			else if (e instanceof GlueDataAccessResourceFailureException ){
				DetailMsg = BZ_COMMON_ERROR_03 + "   " + BZ_COMMON_01;
			}
			else if (e instanceof GlueUncategorizedSQLException ){
				DetailMsg = BZ_COMMON_ERROR_04 + "   " + BZ_COMMON_01;
			}
			else{
				DetailMsg = BZ_COMMON_ERROR_04 + "   " + BZ_COMMON_01;
			}
			
			// 후속 Activity 로 전달 함
			// 생성 된 DATA를 Context 에 저장
			Map<String, Object> errorDataMap = new HashMap<String, Object>();
			
			errorDataMap.put("Msg01", UserMsg);
			errorDataMap.put("Msg02", DetailMsg);
			errorDataMap.put("Msg03", ErrorMsg);
			errorDataMap.put("Msg04", PROC_ID[0]);
			errorDataMap.put("Msg05", USER_ID[0]);
			//errorDataMap.put("Msg06", rownum[i]);   // err 가 발생된  row 값
			errorDataMap.put("Msg06", "");   // err 가 발생된  row 값
			errorDataMap.put("Msg07", PLANT[0]);    // PLANT 
			
			// 생성 된 Map 을 Context 에 저장
			ctx.put("ErrorDataMap", errorDataMap);
			
			// 항상 re-throw 를 해주어야 함
			// 그래야 failure transition 으로 이동 함
			throw e;
		}
		return GlueBizControlConstants.SUCCESS;
	}
}
