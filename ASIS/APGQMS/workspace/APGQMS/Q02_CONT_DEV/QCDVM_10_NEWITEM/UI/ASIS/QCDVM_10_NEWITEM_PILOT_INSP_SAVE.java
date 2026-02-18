package com.Amore.MES.Q02_CONT_DEV;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.Amore.MES.GEN.MGENS_MSG;
import com.Amore.MES.common.ClientUtilsIP;
import com.Amore.MES.common.QueryUtil;
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
import com.poscoict.glueframework.dao.vo.GlueRowSet;

public class QCDVM_10_NEWITEM_PILOT_INSP_SAVE  extends GlueActivity<GlueWebContext> implements MGENS_MSG{     
	public String runActivity(GlueWebContext ctx) {
    	 
        String[] PLANT   			= (String[]) ctx.get("PLANT");
        String[] USER_ID   			= (String[]) ctx.get("USER_ID");
        String[] MATR_CODE   		= (String[]) ctx.get("MATR_CODE");
        String[] BATCH_SEQ   		= (String[]) ctx.get("BATCH_SEQ");
        String[] PILOT_SEQ   		= (String[]) ctx.get("PILOT_SEQ");
        String MACADD      			= ClientUtilsIP.getUserIP();  
        
        CallableStatement cStmt =  null;
		try {
			String cQuery = QueryUtil.getQuery("QCDVM_10_NEWITEM.INSP_REQ_INSERT");
			cStmt = ((Connection)((GlueJdbcDao)getDao("apgqms_dao")).getDBConnection()).prepareCall(cQuery);

			//logger.debug("=========================QCDVM_10_NEWITEM.PLANT=========================" +PLANT[0] );
			
			List<String> cStmsParam = new ArrayList<String>();
			
			cStmsParam.add(PLANT[0] );			// 1 IN_PLANT
			cStmsParam.add(MATR_CODE[0]);		// 2 IN_MATR_CODE
			cStmsParam.add(PILOT_SEQ[0]);		// 3 IN_PILOT_SEQ
			cStmsParam.add(BATCH_SEQ[0]);		// 4 IN_BATCH_SEQ
			cStmsParam.add(USER_ID[0]);			// 5 IN_USER_ID
			cStmsParam.add(MACADD);				// 6 IN_MACADD
			
			int j = 1;
			for (String paramData:cStmsParam){
				cStmt.setString(j++, paramData);
			}			
			cStmt.registerOutParameter(j++, Types.VARCHAR); 
			cStmt.execute();
			
			String R_DESC = cStmt.getString(7);
			
			ctx.put("DetailMsg", R_DESC);
			
			//logger.debug("=========================R_DESC=========================" + R_DESC);
			

			 ArrayList<Map<String, String>> resultArrayList = new ArrayList<Map<String, String>>();//리턴값
			 Map<String, String>  returnFL = new HashMap<String, String>();
			 returnFL.put("RTN_MSG",R_DESC);
			 resultArrayList.add(returnFL);
			 ctx.put("SearchResultMsg", resultArrayList);

		}catch (Exception e){
			// TODO: handle exception
			//logger.debug("=========================rollbackTransaction=========================");
			// TODO Auto-generated catch block
			// 트랜잭션 롤백 수행
			this.rollbackTransaction("tx1");
			
			String UserMsg = null;
			String DetailMsg = null;
			String ErrorMsg = e.getMessage();
	
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

			// Error log 에 입력할 데이터를 생성한다.
			// 사용자가 입력한 데이터를 string 으로 변환 한다. 
			//UserMsg = CHNG_ID[0] + PLANT[0] + PROC_ID[0] + TARGET_YEAR[0] + KPI_CAT[0] + KPI_CI[0] + TARGET_MONTH[0];
			//UserMsg = "ServiceName:" + ctx.get( GlueBizControlConstants.SERVICE_NAME ) + ":activityName:" + this.getName();
			UserMsg = (String) ctx.get("DetailMsg");

		        
			// 후속 Activity 로 전달 함
			// 생성 된 DATA를 Context 에 저장
			Map<String, String> errorDataMap = new HashMap<String, String>();
			errorDataMap.put("Msg01", UserMsg);       //ERROR_DATA 
			errorDataMap.put("Msg02", DetailMsg);     //ERROR_DATA
			errorDataMap.put("Msg03", ErrorMsg);  	//ERROR_DESC
			errorDataMap.put("Msg04", "QCDVM_10_NEWITEM_DTL_NEW");  	//PROC_ID
			errorDataMap.put("Msg05", USER_ID[0]);  	//USER_ID
			errorDataMap.put("Msg06", " ");   			//ERROR_DATA --> parseInt 주의 공백전송
			errorDataMap.put("Msg07", "1110");    	// PLANT 코드
			
			// 생성 된 Map 을 Context 에 저장
				ctx.put("ErrorDataMap", errorDataMap);
				
				// 항상 re-throw 를 해주어야 함
				// 그래야 failure transition 으로 이동 함
				throw new GlueException("Can not execute PL/SQL",e);
							
			}
			finally 
			{
				try 
				{
					cStmt.close();
				} 
				catch (Exception ex) 
				{
					logger.error("Can not Close CallableStatement Query ID [QCDVM_10_NEWITEM.INSP_REQ_INSERT]",ex);
				}
			}
	        return GlueBizControlConstants.SUCCESS;
	    }
	}