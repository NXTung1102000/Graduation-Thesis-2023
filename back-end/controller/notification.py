from fastapi import APIRouter, Depends, Body
from service import notification as service_notification
from sqlalchemy.orm import Session
from config.db import get_db
from schema import exam as schema_exam
from util.jwt import JWTBearer, JWTBearerForTeacher, JWTBearerForAdmin, JWTBearerForTeacherAndAdmin
from schema.request import RequestSchema, ResponseSchema, TokenResponse
from typing import Annotated

API_notification = APIRouter(prefix="/notification", tags=["Notification"])

@API_notification.get('/getunreadnotification/{user_id}', response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def get_unread_notifications(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_notification.get_unread_notifications(user_id, skip, limit, db)
        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)

@API_notification.get('/getallnotification/{user_id}', response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def get_all_notifications(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        result = service_notification.get_all_notifications(user_id, skip, limit, db)
        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_notification.post('/readonenotification', response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def update_status_of_notification(noti_id: Annotated[int, Body()], db: Session = Depends(get_db)):
    try:
        result = service_notification.update_status_of_notification(noti_id, db)
        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)
    
@API_notification.post('/readallnotificationsbyuser', response_model=ResponseSchema, dependencies=[Depends(JWTBearer())])
async def update_status_of_notification_by_user(user_id: Annotated[int, Body()], db: Session = Depends(get_db)):
    try:
        result = service_notification.update_status_of_notification_by_user(user_id, db)
        return ResponseSchema(
            code="200", status="Ok", message="thành công", result=result
        ).dict(exclude_none=True)
    
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return ResponseSchema(
            code="500", status="Internal Server Error", message="Lỗi hệ thống", result=error_message
        ).dict(exclude_none=True)