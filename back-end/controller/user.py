from fastapi import APIRouter, Depends
from service import user as service_user
from sqlalchemy.orm import Session
from config.db import get_db
from schema import user as schema_user
from util.jwt import JWTBearer, JWTBearerForTeacher, JWTBearerForAdmin
from schema.request import RequestSchema, ResponseSchema, TokenResponse

API_user = APIRouter(prefix="/user", tags=["User"])

@API_user.get('/allusers', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForAdmin())])
async def get_all_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_user.get_all_users(skip, limit, db)
        return ResponseSchema[list[schema_user.UserInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_user.get('/allstudents', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForAdmin())])
async def get_all_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_user.get_all_students(skip, limit, db)
        return ResponseSchema[list[schema_user.UserInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_user.get('/allteachers', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForAdmin())])
async def get_all_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_user.get_all_teachers(skip, limit, db)
        return ResponseSchema[list[schema_user.UserInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_user.get('/alladmins', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForAdmin())])
async def get_all_admins(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_user.get_all_admins(skip, limit, db)
        return ResponseSchema[list[schema_user.UserInfo]](
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)