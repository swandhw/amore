package com.Amore.MES.GEN;

import static com.Amore.MES.common.ContextUtil.getVaue;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.poscoict.glueframework.GlueException;
import com.poscoict.glueframework.biz.activity.GlueActivity;
import com.poscoict.glueframework.biz.control.GlueBizControlConstants;
import com.poscoict.glueframework.context.GlueWebContext;
import com.poscoict.glueframework.dao.jdbc.GlueJdbcDao;
import com.poscoict.glueframework.dao.vo.GlueParameter;

/**
 * Error Log를 저장하는 Class이다.
 * @author SSH
 */
public class MGENM_ERROR extends GlueActivity<GlueWebContext>
{
	@Override
	/**
	 * Error Log를 저장하는 Method이다.
	 * @author SSH
	 */
	public String runActivity(GlueWebContext ctx)
	{
		this.rollbackTransaction("tx1");
		
		@SuppressWarnings("rawtypes")
		Map errorDataMap = (Map) ctx.get("ErrorDataMap");
		
		String PLANT					= (String)errorDataMap.get("Msg07");
		String USER_ID				= (String)errorDataMap.get("Msg05");
		String PROC_ID				= (String)errorDataMap.get("Msg04");
		String ERROR_DESC			= (String)errorDataMap.get("Msg03");
		String ERROR_DATA		= (String)errorDataMap.get("Msg01");
		Object ERROR_ROW		= errorDataMap.get("Msg06");
		
		if (isNumeric(ERROR_ROW))
		{
			if (ERROR_ROW instanceof String)
			{
				ERROR_ROW = Integer.parseInt((String)ERROR_ROW);
			}
			
			int row = ((Integer)ERROR_ROW).intValue()+1;
			
			if (row==1)
			{
				ERROR_ROW = "1.st row";
			}
			else if (row==1)
			{
				ERROR_ROW = "1.nd row";
			}
			else if (row==1)
			{
				ERROR_ROW = "1.rd row";
			}
			else
			{
				ERROR_ROW = "1.th row";
			}
		}
		else
		{
			ERROR_ROW = "";
		}
		
		ERROR_ROW = ERROR_ROW + (String)errorDataMap.get("Msg02");
		
		PLANT			= getNullToCtxData(ctx, "PLANT", PLANT);
		USER_ID		= getNullToCtxData(ctx, "USER_ID", USER_ID);
		PROC_ID		= getNullToCtxData(ctx, "PROC_ID", PROC_ID);
		
		GlueParameter<List<Object>> param = new GlueParameter<List<Object>>();
		List<Object> paramList = new ArrayList<Object>();
		param.setParameter(paramList);
		paramList.add(PLANT);
		paramList.add(PLANT);
		paramList.add(PLANT);
		paramList.add(USER_ID);
		paramList.add(PROC_ID);
		paramList.add(ERROR_DESC);
		paramList.add(ERROR_ROW);
		paramList.add(ERROR_DATA);

		((GlueJdbcDao)getDao("apmes_dao")).insert("GEN_ERROR.INSERT", param);
		
		if("".equals(ERROR_ROW))
			ctx.setException(new GlueException(ERROR_DESC));
		else
			ctx.setException(new GlueException(ERROR_ROW + "$$$" + ERROR_DESC));
		
		return GlueBizControlConstants.SUCCESS;
	}
	
	/**
	 * 숫자체크
	 * @param strValue
	 * @return
	 */
	public boolean isNumeric(Object strValue)
	{
		try
		{
			if (strValue instanceof Integer)
			{
			}
			else if (strValue instanceof String)
			{
				Integer.parseInt((String)strValue);
			}
			else
			{
				return false;
			}
			
			return true;
		}
		catch (Exception NumberFormatException)
		{
			return false;
		}
	 }
	
	/**
	 * value가  null이면 ctx에서 key값으로 가져온값 대체.
	 * @param ctx
	 * @param key
	 * @param value
	 * @return
	 */
	public String getNullToCtxData(GlueWebContext ctx, String key, String value)
	{
		if (value==null || "".equals(value))
		{
			value = (String)getVaue(ctx, key, 0);
		}
		
		if (value==null || "".equals(value))
		{
			value = "XXXX";
		}
		
		return value;
	}
}