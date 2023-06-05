from fastapi import APIRouter, Depends, File, UploadFile, Body, Form
from service import exam as service_exam
from sqlalchemy.orm import Session
from config.db import get_db
from schema import exam as schema_exam
from util.jwt import JWTBearer, JWTBearerForTeacher, JWTBearerForAdmin, JWTBearerForTeacherAndAdmin
from schema.request import RequestSchema, ResponseSchema, TokenResponse
from typing import Annotated
from schema.constant import TypeExam, GradeExam

API_exam = APIRouter(prefix="/exam", tags=["Exam"])

@API_exam.get('/allpublicexam', response_model=ResponseSchema)
async def get_all_public_exams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_exam.get_all_public_exams(skip, limit, db)
        return ResponseSchema[list[schema_exam.ExamInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_exam.get('/searchexam', response_model=ResponseSchema)
async def search_exam_public(keyword: str = "", grade: int = None, type: str = None, skip: int = 0, limit: int = 100, \
                      db: Session = Depends(get_db)):
    try:
        result = service_exam.search_exam_public(keyword, grade, type, skip, limit, db)
        return ResponseSchema[list[schema_exam.ExamInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_exam.get('/examcreatedbyuser', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForTeacherAndAdmin())])
async def get_all_exam_created_by_user(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_exam.get_all_exam_created_by_user(user_id, skip, limit, db)
        return ResponseSchema[list[schema_exam.ExamInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_exam.get('/getdetailexamfordo', response_model=ResponseSchema)
async def get_detail_exam_for_do_exam(exam_id: int, db: Session = Depends(get_db)):
    try:
        result = service_exam.get_exam_by_id(exam_id, db)
        return ResponseSchema[schema_exam.ExamDetail](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_exam.get('/getdetailexamforedit', response_model=ResponseSchema)
async def get_detail_exam_for_edit_exam(exam_id: int, db: Session = Depends(get_db)):
    try:
        result = service_exam.get_exam_by_id(exam_id, db)
        return ResponseSchema[schema_exam.ExamDetailHasTrueAnswer](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)

@API_exam.post("/apiv1/createexam", dependencies=[Depends(JWTBearerForTeacherAndAdmin())])
async def create_exam(file: UploadFile, title: Annotated[str, Form()], \
                      type: Annotated[TypeExam, Form()], grade: Annotated[int, Form()], \
                        created_by: Annotated[int, Form()], db: Session = Depends(get_db)):
    try:
        exam_create = schema_exam.ExamCreate(title=title, type=type, grade=grade, created_by=created_by)
        result = service_exam.create_exam(file, exam_create, db)
        if result:
            return ResponseSchema[schema_exam.ExamInfo](
                code="200", status="Ok", 
                message="Tạo đề thi thành công, hệ thống đang trích xuất đề, bạn hãy quay lại sau để chỉnh sửa đề thi nhé !",
                result=result
            ).dict(exclude_none=True)
        
        return ResponseSchema(
            code="400", status="Bad Request", 
            message="Lỗi service"
        ).dict(exclude_none=True)
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)