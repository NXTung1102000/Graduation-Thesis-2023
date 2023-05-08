from fastapi import APIRouter, Depends, HTTPException
from service import account as service_account
from sqlalchemy.orm import Session
from config.db import get_db
from schema import account as schema_account
from util.jwt import JWTBearer, JWTBearerForTeacher, JWTBearerForAdmin
from schema.request import RequestSchema, ResponseSchema, TokenResponse

API_account = APIRouter(prefix="/account", tags=["Account"])

@API_account.get('/accounts', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForAdmin())])
async def get_all_accounts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_account.get_all_accounts(skip, limit, db)
        return ResponseSchema[list[schema_account.Account]](code="200", status="Ok", message="thành công", result=result).dict(exclude_none=True)
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(code="500", status="Internal Server Error", message="Lỗi hệ thống").dict(exclude_none=True)


@API_account.get('/students', response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def get_all_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_account.get_all_students(skip, limit, db)
        return ResponseSchema[list[schema_account.Student]](code="200", status="Ok", message="thành công", result=result).dict(exclude_none=True)
    except Exception as error:
            error_message = str(error.args)
            print(error_message)
            return ResponseSchema(code="500", status="Internal Server Error", message="Lỗi hệ thống").dict(exclude_none=True)



@API_account.get('/teachers', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForTeacher())])
async def get_all_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_account.get_all_teachers(skip, limit, db)
        return ResponseSchema[list[schema_account.Teacher]](code="200", status="Ok", message="thành công", result=result).dict(exclude_none=True)
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(code="500", status="Internal Server Error", message="Lỗi hệ thống").dict(exclude_none=True)


@API_account.get('/admins', response_model=ResponseSchema, dependencies=[Depends(JWTBearerForAdmin())])
async def get_all_admins(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_account.get_all_admins(skip, limit, db)
        return ResponseSchema[list[schema_account.AdminBase]](code="200", status="Ok", message="thành công", result=result).dict(exclude_none=True)
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(code="500", status="Internal Server Error", message="Lỗi hệ thống").dict(exclude_none=True)
