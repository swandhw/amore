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

public class QCDVM_10_NEWITEM_SAVE_UPDATE2 extends GlueActivity<GlueWebContext> implements MGENS_MSG{
    public String runActivity(GlueWebContext ctx) {
    	

        this.logger.debug( "ServiceName : {}", ctx.get( GlueBizControlConstants.SERVICE_NAME ) );
        this.logger.debug( "activity name : {}", this.getName() );
    	
        String[] PLANT              = (String[]) ctx.get("PLANT");
        String[] PROC_ID           	= (String[]) ctx.get("PROC_ID");
        String[] USER_ID       		= (String[]) ctx.get("USER_ID");
        String[] MATR_CODE   		= (String[]) ctx.get("MATR_CODE"); 
		  
		try {	
			
			String strMacadd = ClientUtilsIP.getUserIP();	        
	        String strPut = "";
			 
	        // ds_MAIN_INFO (기본정보)
			DataSet ds = (DataSet)ctx.get("ds_MAIN_INFO");
			
			this.logger.debug("ds getName============================="+ds.getName());
			this.logger.debug("ds getColumnCount"+ds.getColumnCount());					  
			   
			int rowCount = ds.getRowCount();
			
			Map<String, Object> map = null; 
			GlueParameter<Map<String, Object>> mapParam = null; 
			int colCount = 0;
			
			for (int i = 0; i < rowCount; i++) {
				map = new HashMap<String, Object>();
				mapParam = new GlueParameter<Map<String, Object>>();
				
				map.put( "PLANT", PLANT[0] );
				map.put( "PROC_ID", PROC_ID[0] );
				map.put( "USER_ID", USER_ID[0] ); 
				map.put( "MACADD", strMacadd ); 
				map.put( "MATR_CODE", MATR_CODE[0] ); 
				colCount = ds.getColumnCount();
				for (int J = 0; J < colCount; J++) {					
					if(ds.getString(i, ds.getColumn(J).getName()) == null){
						strPut = "";
					}else{
						strPut = ds.getString(i, ds.getColumn(J).getName());				
					}
					map.put(ds.getColumn(J).getName(), strPut );
				}				
				// SAVE_TYPE : 4 변경된 사항 있음
				if( "4".equals( map.get("SAVE_TYPE").toString() ) ) {
					 // UPDATE :: ds_MAIN_INFO		
					mapParam.setParameter( map );			
					((GlueJdbcDao)getDao("apgqms_dao")).insert("QCDVM_10_NEWITEM.UPDATE_INFO", mapParam);  
				}				
			}
			ds = (DataSet)ctx.get("ds_MAIN_FUNCAL");
			   
			rowCount = ds.getRowCount();			  
			for (int i = 0; i < rowCount; i++) {
				map = new HashMap<String, Object>();
				mapParam = new GlueParameter<Map<String, Object>>();
				
				map.put( "PLANT", PLANT[0] );
				map.put( "PROC_ID", PROC_ID[0] );
				map.put( "USER_ID", USER_ID[0] ); 
				map.put( "MACADD", strMacadd ); 
				map.put( "MATR_CODE", MATR_CODE[0] ); 
				colCount = ds.getColumnCount();  
				
				for (int J = 0; J < colCount; J++) {	
					
					if(ds.getString(i, ds.getColumn(J).getName()) == null){
						strPut = "";
					}else{
						strPut = ds.getString(i, ds.getColumn(J).getName());				
					}
					map.put(ds.getColumn(J).getName(), strPut );					
				}
				
				// SAVE_TYPE : 4 변경된 사항 있음
				if( "4".equals( map.get("SAVE_TYPE").toString() ) ) {	
					mapParam.setParameter( map );
					
					// FUNCAL_CI 가 다른경우 QMASTM_MATR_MGT(MMASTM_MATR) UPDATE
					if( !map.get("FUNCAL_CI").toString().equals(map.get("FUNCAL_CI_H").toString()) ){						
						((GlueJdbcDao)getDao("apgqms_dao")).insert("QCDVM_10_NEWITEM.UPDATE_MATR_FUNCAL", mapParam); 
					}
					
					// FUNCAL_ITEM_CODE 가 다른경우 QMASTM_MATR_FUNCAL_ITEM UPDATE
					if( !map.get("FUNCAL_ITEM_CODE").toString().equals(map.get("FUNCAL_ITEM_CODE_H").toString()) ){						
						((GlueJdbcDao)getDao("apgqms_dao")).insert("QCDVM_10_NEWITEM.UPDATE_MATR_FUNCAL_ITEM", mapParam); 
					}
					
				}
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