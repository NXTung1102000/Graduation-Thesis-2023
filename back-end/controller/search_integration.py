from fastapi import APIRouter
from schema.request_integration import RequestSearchIntegration
from schema.request import ResponseSchema
from service.search_integration.factory import FACTORY
from schema.constant import NameSourceExam

API_integration = APIRouter(prefix="/integration", tags=["Search Integration"])
@API_integration.post("/search/{web}")
async def search_one_web(req: RequestSearchIntegration, web:NameSourceExam):
    try:
        engine = FACTORY[web]()
        #result = tasks.run_session(req.dict(),web) 
        result = await engine.full_process(req)
        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    

@API_integration.post("/searchintegration")
async def search_integration(req: RequestSearchIntegration):
    try:
        results = []
        for _source in (NameSourceExam.TOAN_MATH, NameSourceExam.ON_LUYEN, NameSourceExam.TIM_DAP_AN, ):
            engine = FACTORY[_source.value]()
            _result = await engine.full_process(req)
            results += _result

        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=results
        ).dict(exclude_none=True)

    except Exception as error:
        error_message = str(error.args)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
