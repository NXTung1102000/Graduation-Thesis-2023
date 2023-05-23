from fastapi import APIRouter, Depends, Body
from typing import Annotated
from service import classes as service_class
from sqlalchemy.orm import Session
from config.db import get_db
from schema import classes as schema_class
from util.jwt import JWTBearer, JWTBearerForTeacher, JWTBearerForAdmin
from schema.request import RequestSchema, ResponseSchema, TokenResponse

API_Class_Student = APIRouter(prefix="/class/student", tags=["Class_Student"])

@API_Class_Student.get('/getclassstudentcansee', response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def get_class_student_can_see(student_id: int, db: Session = Depends(get_db)):
    try:
        result = service_class.get_class_student_can_see(student_id, db)
        return ResponseSchema[list[schema_class.ClassStatus]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_Class_Student.post("/studentregisterclass", response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def student_register_class(student_id: Annotated[int, Body()], class_id: Annotated[int, Body()], db: Session = Depends(get_db)):
    try:
        result = service_class.student_register_class(student_id, class_id, db)
        code = result[0]
        message = result[1]
        if code == "200":
            return ResponseSchema(
                code=code, status="Ok", message=message
            ).dict(exclude_none=True)
        return ResponseSchema(
            code = code, status="Bad request", message = message
        ).dict(exclude_none=True)
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
