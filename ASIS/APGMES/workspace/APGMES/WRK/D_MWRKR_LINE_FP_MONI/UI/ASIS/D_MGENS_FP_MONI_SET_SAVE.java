package com.Amore.MES.GEN;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.Amore.MES.GEN.MGENS_MSG;
import com.Amore.MES.security.AmoreShaCipher;
import com.Amore.MES.common.QueryUtil;
import com.nexacro.xapi.data.DataSet;
import com.poscoict.glueframework.GlueException;
import com.poscoict.glueframework.biz.activity.GlueActivity;
import com.poscoict.glueframework.biz.activity.GlueActivityConstants;
import com.poscoict.glueframework.biz.control.GlueBizControlConstants; 
import com.poscoict.glueframework.context.GlueContext;
import com.poscoict.glueframework.context.GlueWebContext;
import com.poscoict.glueframework.dao.GlueBadSqlGrammarException;
import com.poscoict.glueframework.dao.GlueDataAccessResourceFailureException;
import com.poscoict.glueframework.dao.GlueDataIntegrityViolationException;
import com.poscoict.glueframework.dao.GlueUncategorizedSQLException;
import com.poscoict.glueframework.dao.jdbc.GlueJdbcDao;
import com.poscoict.glueframework.dao.vo.GlueParameter;
import com.poscoict.glueframework.dao.vo.GlueRow;
import com.poscoict.glueframework.dao.vo.GlueRowSet;

public class D_MGENS_FP_MONI_SET_SAVE extends GlueActivity<GlueWebContext> implements MGENS_MSG{

	public String runActivity(GlueWebContext ctx) 
	{   	
        // Session 정보
    	String[] PLANT 		= (String[]) ctx.get("PLANT");
		String[] CHNG_ID 	= (String[]) ctx.get("CHNG_ID");
		String[] PROC_ID 	= (String[]) ctx.get("PROC_ID");
		String[] LANG_TYPE 	= (String[]) ctx.get("LANG_TYPE");

		try {	
				DataSet ds = (DataSet)ctx.get("ds_Main");
				  
				String colNm = "";
				String colValue = "";
				 
				int rowCount = ds.getRowCount();
				int colCount = ds.getColumnCount();
				Map<String, Object> map = new HashMap<String, Object>(); 
				GlueParameter<Map<String, Object>> mapParam = new GlueParameter<Map<String, Object>>(); 

			for (int i = 0; i < rowCount; i++) 
			{
				map.clear();
				map.put( "PLANT", PLANT[0]);
				map.put( "CHNG_ID", CHNG_ID[0]);
				map.put( "PROC_ID", PROC_ID[0]); 
				map.put( "LANG_TYPE", LANG_TYPE[0]); 
				
				for (int J = 0; J < colCount; J++) 
				{
					colNm = ds.getColumn(J).getName();
					colValue = ds.getString(i, ds.getColumn(J).getName());
					if(colValue == null)
					{
						colValue = "";
					}
					map.put(colNm, colValue );
				}
				mapParam.setParameter( map );
				
				((GlueJdbcDao)getDao("apmes_dao")).update("D_MGENS_FP_MONI_SET.UPSERT", mapParam);
			}  
		}catch (GlueException e){
			// TODO: handle exception
			logger.debug("=========================rollbackTransaction=========================");
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
			UserMsg = "ServiceName:" + ctx.get( GlueBizControlConstants.SERVICE_NAME ) + ":activityName:" + this.getName();
			

		        
			// 후속 Activity 로 전달 함
			// 생성 된 DATA를 Context 에 저장
			Map<String, String> errorDataMap = new HashMap<String, String>();
			errorDataMap.put("Msg01", UserMsg);       //ERROR_DATA 
			errorDataMap.put("Msg02", DetailMsg);     //ERROR_DATA
			errorDataMap.put("Msg03", ErrorMsg);  	//ERROR_DESC
			errorDataMap.put("Msg04", PROC_ID[0]);  	//PROC_ID
			errorDataMap.put("Msg05", CHNG_ID[0]);  	//USER_ID
			errorDataMap.put("Msg06", " ");   			//ERROR_DATA --> parseInt 주의 공백전송
			errorDataMap.put("Msg07", PLANT[0]);    	// PLANT 코드
			
			// 생성 된 Map 을 Context 에 저장
			ctx.put("ErrorDataMap", errorDataMap);
			
			// 항상 re-throw 를 해주어야 함
			// 그래야 failure transition 으로 이동 함
			throw e;

		}
        return GlueBizControlConstants.SUCCESS;
    }
}