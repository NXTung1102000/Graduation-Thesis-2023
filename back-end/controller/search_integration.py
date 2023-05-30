from fastapi import APIRouter
from schema.request_integration import RequestSearchIntegration
from schema.request import ResponseSchema
from service.search_integration.factory import FACTORY
from schema.constant import NameSourceExam
from fuzzywuzzy import fuzz

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
    



def is_duplicate_title(title1, title2):
    similarity_ratio = fuzz.ratio(title1, title2)
    return similarity_ratio >= 80  # Nếu tỷ lệ tương đồng >= 80%, coi là trùng lặp

# Hàm để kiểm tra xem một bản ghi có trùng lặp trong mảng tích hợp hay không
def is_duplicate_exam(integrated_exams, exam):
    for integrated_exam in integrated_exams:
        if (
            exam["type"] == integrated_exam["type"]
            and exam["grade"] == integrated_exam["grade"]
            and exam["source"] != integrated_exam["source"]
            and is_duplicate_title(exam["title"], integrated_exam["title"])
        ):
            return True
    return False

@API_integration.post("/searchintegration")
async def search_integration(req: RequestSearchIntegration):
    try:
        results = []
        res_toanmath = await FACTORY[NameSourceExam.TOAN_MATH.value]().full_process(req)
        results += res_toanmath
        res_onluyen = await FACTORY[NameSourceExam.ON_LUYEN.value]().full_process(req)
        res_timdapan = await FACTORY[NameSourceExam.TIM_DAP_AN.value]().full_process(req)

        __duplicate = []
        for _onluyen in res_onluyen:
            if not is_duplicate_exam(results, _onluyen):
                results.append(_onluyen)
            else:
                __duplicate.append(_onluyen)

        for _timdapan in res_timdapan:
            if not is_duplicate_exam(results, _timdapan):
                results.append(_timdapan)
            else:
                __duplicate.append(_timdapan)
        
        for _d in __duplicate:
            print(_d)

        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=results
        ).dict(exclude_none=True)

    except Exception as error:
        error_message = str(error.args)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
