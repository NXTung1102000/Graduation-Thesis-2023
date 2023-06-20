from sqlalchemy.orm import Session
from model import models
from sqlalchemy import update
from config.websocket import ConnectionManager
from fastapi import WebSocket
import asyncio
import json

def get_unread_notifications(user_id: int, skip: int, limit: int, db: Session):
    db_noti = db.query(models.Notification).filter(models.Notification.user_id == user_id)\
        .filter(models.Notification.is_read == False).offset(skip).limit(limit).all()
    return db_noti

def get_all_notifications(user_id: int, skip: int, limit: int, db: Session):
    db_noti = db.query(models.Notification).filter(models.Notification.user_id == user_id)\
        .offset(skip).limit(limit).all()
    return db_noti

def add_notification(user_id, content: str, db: Session):
    db_noti = models.Notification(
        user_id = user_id,
        content = content
    )
    db.add(db_noti)
    db.commit()
    db.refresh(db_noti)
    return db_noti

def update_status_of_notification(noti_id: int, db: Session):
    try:
        db_noti = db.query(models.Notification).filter(models.Notification.noti_id == noti_id)\
            .first()
        db_noti.is_read = True
        return True
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return False
    
def update_status_of_notification_by_user(user_id: int, db: Session):
    try:
        stmt = (
            update(models.Notification)
            .where(models.Notification.user_id == user_id)
            .values(is_read=True)
            )
        db.execute(stmt)
        db.commit()
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
        return False
