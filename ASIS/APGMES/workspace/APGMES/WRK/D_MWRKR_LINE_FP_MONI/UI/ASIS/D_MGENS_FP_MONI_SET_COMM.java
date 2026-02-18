package com.Amore.MES.GEN;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.Amore.MES.common.QueryUtil;
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
import com.poscoict.glueframework.dao.vo.GlueRow;
import com.poscoict.glueframework.dao.vo.GlueRowSet;

public class D_MGENS_FP_MONI_SET_COMM extends GlueActivity<GlueWebContext> implements MGENS_MSG  {

	@Override
	public String runActivity(GlueWebContext ctx) {
		// TODO Auto-generated method stub
		
		String[] rowStatus 			= (String[]) ctx.get("rowStatus");
		String[] rownum 			= (String[]) ctx.get("rownum");
		String[] PLANT 				= (String[]) ctx.get("PLANT");
		
		String[] CHNG_ID 			= (String[]) ctx.get("CHNG_ID");
		String[] PROC_ID 			= (String[]) ctx.get("PROC_ID");
	
		
		CallableStatement cStmt01 =  null;
	    try 
	    {   
	    	
	    	cStmt01 = ((Connection)((GlueJdbcDao)getDao("apmes_dao")).getDBConnection()).prepareCall(QueryUtil.getQuery("D_MGENS_FP_MONI_SET.CALL"));
	    	
	    	cStmt01.setString(1, PLANT[0]);   					
		    cStmt01.setString(2, CHNG_ID[0]);			
	    	
	    	cStmt01.registerOutParameter(3, Types.VARCHAR);
	    	cStmt01.execute();
	    	
	        String rDesc01 = cStmt01.getString(3);
	        
			logger.debug("DetailMsg : [{}]", rDesc01);
	      
	        ctx.put("DetailMsg01", rDesc01);
			
	        
	    }
	    catch (Exception ex) 
    	{
	         logger.error("Can not execute PL/SQL",ex);	
	         
	         this.rollbackTransaction("tx1");
	         
	         //String UserMsg = null;
			 String ErrorMsg = ex.getMessage();
			 String UserMsg = (String) ctx.get("DetailMsg01");
			 
			 // 후속 Activity 로 전달 함
			 // 생성 된 DATA를 Context 에 저장
			 Map errorDataMap = new HashMap();
			
			 errorDataMap.put("Msg01", UserMsg);
			 errorDataMap.put("Msg02", " ");
			 errorDataMap.put("Msg03", ErrorMsg);
			 errorDataMap.put("Msg04", PROC_ID[0]);
			 errorDataMap.put("Msg05", CHNG_ID[0]);
			 errorDataMap.put("Msg06", " ");   // err 가 발생된  row 값
			 errorDataMap.put("Msg07", PLANT[0]);    // PLANT 
			 // 생성 된 Map 을 Context 에 저장
			 ctx.put("ErrorDataMap", errorDataMap);
			 				 
	         throw new GlueException(UserMsg);
    	}
	    finally 
     	{
	    	try 
	        {
	             cStmt01.close();
	        } 
	    	catch (Exception ex) 
	        {
	             logger.error("Can not Close CallableStatement Query ID [P_PAC_FP_RESET]",ex);
	        }
     	}	
		
		return GlueBizControlConstants.SUCCESS;  
		
	}

}
