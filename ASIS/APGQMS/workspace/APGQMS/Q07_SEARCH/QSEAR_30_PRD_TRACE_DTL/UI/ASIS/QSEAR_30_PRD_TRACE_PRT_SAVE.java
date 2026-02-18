package com.Amore.MES.Q07_SEARCH;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.poscoict.glueframework.dao.vo.GlueRowSet;
 
public class QSEAR_30_PRD_TRACE_PRT_SAVE extends GlueActivity<GlueWebContext> implements MGENS_MSG{
    public String runActivity(GlueWebContext ctx) {
    	

        this.logger.debug( "ServiceName : {}", ctx.get( GlueBizControlConstants.SERVICE_NAME ) );
        this.logger.debug( "activity name : {}", this.getName() );
    	
        String[] PLANT              = (String[]) ctx.get("PLANT");
        String[] PROC_ID           	= (String[]) ctx.get("PROC_ID");
        String[] CHNG_ID       		= (String[]) ctx.get("CHNG_ID");
        String[] LANG_TYPE    		= (String[]) ctx.get("LANG_TYPE");
        
		try {	 
	        
	        //insert를 위한 key 값 들고오기
			String sSql="SELECT QTMPTT_PRT_REPORT_SEQ.NEXTVAL AS PRT_SEQ FROM DUAL";			 
			GlueRowSet<?> key = (GlueRowSet<?>)((GlueJdbcDao)getDao("apgqms_dao")).findByQueryStatement( sSql.toString() );
			String PRT_SEQ= String.valueOf(key.get(0).getAttribute("PRT_SEQ")) ;		    
		    
			
			// ds_REPORT 
			DataSet ds = (DataSet)ctx.get("ds_FER_PRT");
			
			int totCnt = 0;
			String TEST_LOT="";			
			
			int rowCount = ds.getRowCount();
			List <Map<String, Object>> list = new ArrayList <Map<String, Object>> ();
			GlueParameter<Map<String, Object>> mapParam = null; 
			Map<String, Object> map = null;
			Map<String, String> mapHal = new HashMap <String, String> ();
			GlueRowSet<?> strMnu = null;
			String strRohParam = "";			
			String strRohTestParam = "";
			String strHal4TestParam = "";
			String strFerTestLot = "";
			
			for (int i = 0; i < rowCount; i++) {
				
				if(ds.getString(i, "TEST_LOT" ) != null) {
					TEST_LOT =ds.getString(i, "TEST_LOT" );						
				}				
				if( !TEST_LOT.equals("") ) {
					totCnt ++;
					strFerTestLot += TEST_LOT+"^,^";
					map = new HashMap<String, Object> ();
					map.put("TEST_LOT", 	TEST_LOT);
					map.put("MATR_CI_CODE", ds.getString(i, "MATR_CI_CODE" ));
					map.put("PLANT", 		ds.getString(i, "MATR_CI_CODE" ));
					map.put("ORDER_NO", 	ds.getString(i, "ORDER_NO" ));
					map.put("ORDER_SEQ", 	ds.getString(i, "ORDER_SEQ" ));
					//완제품에 걸린 내용물 삭제
					//mapParam = new GlueParameter<Map<String, Object>>(); 
					//mapParam.setParameter( map );
					//((GlueJdbcDao)getDao("apgqms_dao")).delete("QSEAR_30_PRD_TRACE_PRT_FER1_MNU_DELETE", mapParam); 					
					
					//내용물 찾기
					GlueParameter<List<Object>> paramTest = new GlueParameter<List<Object>>();
					List<Object> paramListTest = new ArrayList<Object>();
					paramListTest.add(PLANT[0]);
					paramListTest.add(PLANT[0]);
					paramListTest.add(ds.getString(i, "ORDER_NO" ));
					paramListTest.add(ds.getString(i, "ORDER_SEQ" ));
					paramListTest.add(PLANT[0]);
					paramListTest.add(ds.getString(i, "ORDER_NO" ));
					paramListTest.add(ds.getString(i, "ORDER_SEQ" ));
					paramTest.setParameter(paramListTest);
					strMnu = (GlueRowSet<?>)((GlueJdbcDao)getDao("apgqms_dao")).find("QSEAR_30_PRD_TRACE_PRT_MNU.SELECT", paramTest);	
					
					if (strMnu != null) {
						int mnuCnt = strMnu.size();
						for(int v=0; v<mnuCnt; v++) {
							if(strMnu.get(v) !=null ) {
								totCnt ++;	
								String strMatrCiCode = strMnu.get(v).get("MATR_CI_CODE")!=null?strMnu.get(v).get("MATR_CI_CODE").toString():"";								
								if(!strMatrCiCode.equals("") && !strMatrCiCode.equals("HAL4")) {
									//System.out.println("dasdads::"+strMatrCiCode + "," + ((mapHal.get(strMatrCiCode)==null?"":mapHal.get(strMatrCiCode)) + strMnu.get(v).get("TEST_LOT")+"^,^"));
									mapHal.put(strMatrCiCode, ((mapHal.get(strMatrCiCode)==null?"":mapHal.get(strMatrCiCode)) + strMnu.get(v).get("TEST_LOT")+"^,^"));
								}								
								/* 원료에서 설정
								 * else if (strMatrCiCode.equals("HAL4")) {
								     strHal4TestParam += strMnu.get(v).get("TEST_LOT")+"^,^";	
								   }
								 * */
								strRohParam += strMnu.get(v).get("ORDER_NO")+",";
							}
						}
					}
				} 
			}
			map = new HashMap<String, Object> ();
			map.put("TEST_LOT", 	"^"+strFerTestLot.substring(0, strFerTestLot.length()-2));
			map.put("MATR_CI_CODE", ds.getString(0, "MATR_CI_CODE" ));
			list.add(map);
			
			if(mapHal!=null) {
				for( String keySet : mapHal.keySet() ) { 					
					String strValue = mapHal.get(keySet);
					if(keySet != null && mapHal.get(keySet) != null) {						
						map = new HashMap<String, Object> ();
						//System.out.println( "key : " + keySet + ", value : " + "^"+strValue.substring(0, strValue.length()-2) ); 
						map.put("MATR_CI_CODE", keySet);						
						map.put("TEST_LOT", 	"^"+strValue.substring(0, strValue.length()-2));
						list.add(map);
					}
				}
			}			
			if (!strRohParam.equals("")) {				
				//원료 search
				GlueParameter<List<Object>> param = new GlueParameter<List<Object>>();
				List<Object> paramList = new ArrayList<Object>();
				paramList.add(PLANT[0]);
				paramList.add(strRohParam);
				paramList.add(strRohParam);
				param.setParameter(paramList);
				GlueRowSet<?> strRoh = (GlueRowSet<?>)((GlueJdbcDao)getDao("apgqms_dao")).find("QSEAR_30_PRD_TRACE_PRT_ROH.SELECT", param);					
				
				/*가공원료, 원료*/
				if(strRoh != null) {
					int rohCnt = strRoh.size();
					int chki = 0;
					for(int g=0; g<rohCnt; g++) {
						if(strRoh.get(g) !=null ) {
							totCnt ++;
							String strMatrCiCode = strRoh.get(g).get("MATR_CI_CODE")!=null?strRoh.get(g).get("MATR_CI_CODE").toString():"";
							mapHal.put(strMatrCiCode, strMatrCiCode + strRoh.get(g).get("TEST_LOT")+"^,^");
							
							if(strRoh.get(g).get("MATR_CI_CODE").equals("HAL4")) {								
								strHal4TestParam += strRoh.get(g).get("TEST_LOT")+"^,^";	
							} else {
								chki ++;
								strRohTestParam += strRoh.get(g).get("TEST_LOT")+"^,^";	
							}
							if(chki == 50) {
								map = new HashMap<String, Object> ();
								map.put("TEST_LOT", 	"^"+strRohTestParam.substring(0, strRohTestParam.length()-2));
								map.put("MATR_CI_CODE", "ROH6");
								list.add(map);
								
								chki = 0;
								strRohTestParam = "";
							}
						}
					}
					if(strRohTestParam.length() > 3) {
						map = new HashMap<String, Object> ();
						map.put("TEST_LOT", 	"^"+strRohTestParam.substring(0, strRohTestParam.length()-2));
						map.put("MATR_CI_CODE", "ROH6");
						list.add(map);
					}
					if(strHal4TestParam.length() > 3) {
						map = new HashMap<String, Object> ();
						map.put("TEST_LOT", 	"^"+strHal4TestParam.substring(0, strHal4TestParam.length()-2));
						map.put("MATR_CI_CODE", "HAL4");
						list.add(map);
					}
				}
			}			
			if(list!=null) {
				mapParam = new GlueParameter<Map<String, Object>>(); 
				for(int s=0; s<list.size(); s++) {
					map = new HashMap<String, Object>(); 
					
					Map<String, Object> smap = list.get(s);
					
					map.put( "PLANT", 			PLANT[0] );
					map.put( "PROC_ID", 		PROC_ID[0] );
					map.put( "USER_ID", 		CHNG_ID[0] ); 
					map.put( "MACADD", 			ClientUtilsIP.getUserIP() ); 
					map.put( "LANG_TYPE", 		LANG_TYPE[0] ); 
					map.put( "MGT_SEQ", 		"00001" ); 
					map.put( "LANG_TYPE_EXP", 	"XX" );
					map.put( "PRT_SEQ", 		PRT_SEQ );
					map.put( "MATR_CI_CODE",	smap.get("MATR_CI_CODE")); 
					map.put( "TEST_LOT", 		smap.get("TEST_LOT") ); 					
					mapParam.setParameter( map );
					
					((GlueJdbcDao)getDao("apgqms_dao")).update("COMM_REPORT_FER1_SAVE", mapParam);
				}
			}
			
			ArrayList<Map<String, Object>> arr_ds_return = new ArrayList<Map<String, Object>>();
	        Map<String, Object> return_map = new HashMap<String, Object>(); 
	        return_map.put("TOT_CNT", 	totCnt);
	        return_map.put("PRT_SEQ", 	PRT_SEQ);
	        arr_ds_return.add(return_map);	        	
        	ctx.put("RetrunSeq", arr_ds_return);
        	
			//ctx.put("RetrunSeq", key);
			logger.debug("map.put PRT_SEQ ::" + key ); 
			
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
			errorDataMap.put("Msg03", ErrorMsg);  		//ERROR_DESC
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