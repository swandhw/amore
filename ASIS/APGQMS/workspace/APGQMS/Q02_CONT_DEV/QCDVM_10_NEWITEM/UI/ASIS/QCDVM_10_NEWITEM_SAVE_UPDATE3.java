package com.Amore.MES.Q02_CONT_DEV;

import java.util.HashMap;
import java.util.Map;

import com.Amore.MES.GEN.MGENS_MSG;
import com.Amore.MES.common.ClientUtilsIP;
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

public class QCDVM_10_NEWITEM_SAVE_UPDATE3 extends GlueActivity<GlueWebContext> implements MGENS_MSG{
    public String runActivity(GlueWebContext ctx) {
    	

        this.logger.debug( "ServiceName : {}", ctx.get( GlueBizControlConstants.SERVICE_NAME ) );
        this.logger.debug( "activity name : {}", this.getName() );
    	
        String[] PLANT              = (String[]) ctx.get("PLANT");
        String[] PROC_ID           	= (String[]) ctx.get("PROC_ID");
        String[] USER_ID       		= (String[]) ctx.get("USER_ID");
        String[] MACADD      		= (String[]) ctx.get("MACADD"); 
        String[] MATR_CODE   		= (String[]) ctx.get("MATR_CODE"); 
        String[] CHNG_RSN   		= (String[]) ctx.get("CHNG_RSN");
        String[] CHNG_ACT   		= (String[]) ctx.get("CHNG_ACT"); 
		  
		try {	
			// 내용물 신제품 2020.02.06 판단결과(의견) 별도 저장
			
			MACADD[0] = ClientUtilsIP.getUserIP();
			
//			this.logger.debug("PLANT:::::"+PLANT[0]);
//	        this.logger.debug("PROC_ID:::::"+PROC_ID[0]);
//	        this.logger.debug("USER_ID:::::"+USER_ID[0]); 
//	        this.logger.debug("MACADD:::::"+MACADD[0]);  
//	        this.logger.debug("MATR_CODE:::::"+MATR_CODE[0]);  
	        
	        String strPut = "";
			 
	        // ds_MAIN_INFO (기본정보)
			DataSet ds = (DataSet)ctx.get("ds_MAIN_INFO");
			
			this.logger.debug("ds getName============================="+ds.getName());
			this.logger.debug("ds getColumnCount"+ds.getColumnCount());
			  
//			for (int i = 0; i < ds.getColumnCount(); i++) {
//				this.logger.debug("ds 필드명"+ds.getColumn(i).getName());
//			}						  
			   
			Map<String, Object> map = null; 
			GlueParameter<Map<String, Object>> mapParam = null; 
			
			/* 변경이력 저장 */
			if(!"X".equals(CHNG_RSN[0])){ 
				map = new HashMap<String, Object>();
				mapParam = new GlueParameter<Map<String, Object>>();
				map.put( "PLANT", PLANT[0] );
				map.put( "MATR_CODE", MATR_CODE[0] ); 
				map.put( "CHNG_ID", USER_ID[0] ); 
				map.put( "MACADD", MACADD[0] ); 	
				map.put( "PROC_ID", PROC_ID[0] );
				map.put( "CHNG_ACT", CHNG_ACT[0] );
				map.put( "CHNG_RSN", CHNG_RSN[0] ); 
				mapParam.setParameter( map );			
				((GlueJdbcDao)getDao("apgqms_dao")).insert("QCDVM_10_NEWITEM.INSERT_CHNG_RSN", mapParam);   
			}
			

			int rowCount = ds.getRowCount();
			int colCount = 0;			
			for (int i = 0; i < rowCount; i++) {
				map = new HashMap<String, Object>();
				mapParam = new GlueParameter<Map<String, Object>>();
				
				map.put( "PLANT", PLANT[0] );
				map.put( "PROC_ID", PROC_ID[0] );
				map.put( "USER_ID", USER_ID[0] ); 
				map.put( "MACADD", MACADD[0] ); 
				map.put( "MATR_CODE", MATR_CODE[0] ); 
				colCount = ds.getColumnCount();
				for (int J = 0; J < colCount; J++) {					
					if(ds.getString(i, ds.getColumn(J).getName()) == null){
						strPut = "";
					}else{
						strPut = ds.getString(i, ds.getColumn(J).getName());				
					}
					map.put(ds.getColumn(J).getName(), strPut );
//					logger.debug("map.put " + ds.getColumn(J).getName() + " ::" + strPut ); 
				}
					
				mapParam.setParameter( map );			
				((GlueJdbcDao)getDao("apgqms_dao")).update("QCDVM_10_NEWITEM.UPDATE_RESULT", mapParam);  
								
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
			errorDataMap.put("Msg05", USER_ID[0]);  	//USER_ID
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