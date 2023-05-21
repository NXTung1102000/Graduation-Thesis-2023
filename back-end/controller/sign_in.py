from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.db import get_db
from service import sign_in
from schema import user as schema_user
from model import models
from datetime import datetime, timedelta
from schema.request import RequestSchema, ResponseSchema, TokenResponse
from util.jwt import generate_token

API_SignIn = APIRouter(prefix="", tags=["Sign in, Sign up"])


"""
    Authentication Router
"""

@API_SignIn.post('/login')
async def login(account: schema_user.UserLogin, db: Session = Depends(get_db)):
    try:
        result = sign_in.login(account, db)
        code = result[0]
        message = result[1]
        role = result[2]
        if(code == "200"):
            token = generate_token({"sub": account.email, "role": role})
            user = result[3]
            detail_user = {
                "user_id": user.user_id,
                "email": user.email,
                "name": user.name,
                "role": role
            }
            return ResponseSchema(
                code = code, status="Ok", message = message,
                result = TokenResponse(access_token=token, token_type="Bearer", user=detail_user)
            ).dict(exclude_none=True)
        
        return ResponseSchema(
                code = code, status="Bad request", message = message
            ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message).dict(exclude_none=True)


@API_SignIn.post('/register_student')
async def register_student(student: schema_user.UserCreate, db: Session = Depends(get_db)):
    role_student = 1
    try:
        result = sign_in.register(student, role_student , db)
        if result:
            return ResponseSchema(
                code="200", status="Ok", 
                message="Tài khoản học sinh đã được tạo"
            ).dict(exclude_none=True)
        return ResponseSchema(
            code="400", status="Bad Request", 
            message="Email {} đã tồn tại".format(student.email)
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", 
            message="Lỗi hệ thống"
        ).dict(exclude_none=True)

@API_SignIn.post('/register_teacher')
async def register_teacher(teacher: schema_user.UserCreate, db: Session = Depends(get_db)):
    role_teacher = 2
    try:
        result = sign_in.register(teacher, role_teacher, db)
        if result:
            return ResponseSchema(
                code="200", status="Ok", 
                message="Tài khoản học sinh đã được tạo"
            ).dict(exclude_none=True)
        
        return ResponseSchema(
            code="400", status="Bad Request", 
            message="Email {} đã tồn tại".format(teacher.email)
        ).dict(exclude_none=True)

    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", 
            message="Lỗi hệ thống"
        ).dict(exclude_none=True)

@API_SignIn.post('/register_admin')
async def register_admin(admin: schema_user.UserCreate, db: Session = Depends(get_db)):
    role_admin = 0
    try:
        result = sign_in.register(admin, role_admin, db)
        if result:
            return ResponseSchema(
                code="200", status="Ok", 
                message="Tài khoản học sinh đã được tạo"
            ).dict(exclude_none=True)
        
        return ResponseSchema(
            code="400", status="Bad Request", 
            message="Email {} đã tồn tại".format(admin.email)
        ).dict(exclude_none=True)

    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", 
            message="Lỗi hệ thống"
        ).dict(exclude_none=True)