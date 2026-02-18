package com.Amore.MES.MAS;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.Amore.MES.GEN.MGENS_MSG;
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


public class D_MMASM_BAD_CODE_SAVE extends GlueActivity<GlueWebContext> implements MGENS_MSG {

	@SuppressWarnings("unchecked")
	public String runActivity(GlueWebContext ctx) {
		// TODO Auto-generated method stub
		
		String[] CUD_TYPE      = (String[]) ctx.get("CUD_TYPE");
		String[] PLANT         = (String[]) ctx.get("PLANT");
		String[] rowStatus     = (String[]) ctx.get("rowStatus");
		String[] rownum        = (String[]) ctx.get("rownum");
		String[] PRD_CI        = (String[]) ctx.get("PRD_CI");
		String[] BAD_CODE      = (String[]) ctx.get("BAD_CODE");
		String[] BAD_CODE_NAME = (String[]) ctx.get("BAD_CODE_NAME");
		String[] BAD_CI        = (String[]) ctx.get("BAD_CI");
		String[] REMARK        = (String[]) ctx.get("REMARK");
		String[] CUD_CI        = (String[]) ctx.get("CUD_CI");
		String[] CHNG_ID       = (String[]) ctx.get("CHNG_ID");
		String[] PROC_ID       = (String[]) ctx.get("PROC_ID");
		
		int i = 0;
		
		try
		{
			for (i=0; i<rowStatus.length; i++) {
				
				if ("U".equals(CUD_TYPE[i])) {
					if ("N".equals(CUD_CI[i])) {
						CUD_CI[i] = "D";
					}
					else {
						CUD_CI[i] = "U";
					}
					// update
					GlueParameter<List<Object>> param = new GlueParameter<List<Object>>();
					List<Object> paramList = new ArrayList<Object>();
					param.setParameter(paramList);
					paramList.add(BAD_CODE_NAME[i]);
					paramList.add(CUD_CI[i]);
					paramList.add(BAD_CI[i]);
					paramList.add(REMARK[i]);
					paramList.add(CHNG_ID[0]);
					paramList.add(PLANT[0]);
					paramList.add(PROC_ID[0]);
					paramList.add(PLANT[0]);
					paramList.add(BAD_CODE[i]);
					paramList.add(PRD_CI[i]);
					((GlueJdbcDao)getDao("apmes_dao")).update("D_MMASM_BAD_CODE.UPDATE", param);
					
				}
				else if ("D".equals(CUD_TYPE[i])) {
					// delete
					GlueParameter<List<Object>> param = new GlueParameter<List<Object>>();
					List<Object> paramList = new ArrayList<Object>();
					param.setParameter(paramList);
					paramList.add("D");
					paramList.add(CHNG_ID[0]);
					paramList.add(PLANT[0]);
					paramList.add(PROC_ID[0]);
					paramList.add(PLANT[0]);
					paramList.add(BAD_CODE[i]);
					paramList.add(PRD_CI[0]);
					((GlueJdbcDao)getDao("apmes_dao")).update("D_MMASM_BAD_CODE.DELETE", param);
					
				}
				else if("C".equals(CUD_TYPE[i])){
					if ("N".equals(CUD_CI[i])) {
						CUD_CI[i] = "D";
					}
					else {
						CUD_CI[i] = "C";
					}
					// insert
					GlueParameter<List<Object>> param = new GlueParameter<List<Object>>();
					List<Object> paramList = new ArrayList<Object>();
					param.setParameter(paramList);
					paramList.add(PLANT[0]);
					paramList.add(BAD_CODE[i]);
					paramList.add(BAD_CODE_NAME[i]);
					paramList.add(BAD_CI[i]);
					paramList.add(REMARK[i]);
					paramList.add(CHNG_ID[0]);
					paramList.add(PLANT[0]);
					paramList.add(PROC_ID[0]);
					paramList.add(CUD_CI[i]);
					paramList.add(PRD_CI[i]);
					((GlueJdbcDao)getDao("apmes_dao")).insert("D_MMASM_BAD_CODE.INSERT", param);
				}
			}
		}
		
		catch (GlueException e)
		{
			// TODO Auto-generated catch block
			// 트랜잭션 롤백 수행
			this.rollbackTransaction("tx1");
			
			String UserMsg = null;
			String DetailMsg = null;
			String ErrorMsg = e.getMessage();
	
			// Error log 에 입력할 데이터를 생성한다.
			// 사용자가 입력한 데이터를 string 으로 변환 한다. 
			UserMsg = CUD_CI[i] + BAD_CI[i] + BAD_CODE[i] + BAD_CODE_NAME[i] + REMARK[i];
			
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
				DetailMsg = BZ_COMMON_ERROR_03 + "   " + BZ_COMMON_01;
			}
			
			// 후속 Activity 로 전달 함
			// 생성 된 DATA를 Context 에 저장
			Map errorDataMap = new HashMap();
			
			errorDataMap.put("Msg01", UserMsg);
			errorDataMap.put("Msg02", DetailMsg);
			errorDataMap.put("Msg03", ErrorMsg);
			errorDataMap.put("Msg04", PROC_ID[0]);
			errorDataMap.put("Msg05", CHNG_ID[0]);
			errorDataMap.put("Msg06", rownum[i]);   // err 가 발생된  row 값
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
