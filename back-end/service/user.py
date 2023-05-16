from sqlalchemy.orm import Session
from model import models

def get_all_users(skip: int, limit: int, db: Session):
    result = db.query(models.User).offset(skip).limit(limit).all()
    return result

def get_all_students(skip: int, limit: int, db: Session):
    result = db.query(models.User).filter(models.User.role == 1).offset(skip).limit(limit).all()
    return result

def get_all_teachers(skip: int, limit: int, db: Session):
    result = db.query(models.User).filter(models.User.role == 2).offset(skip).limit(limit).all()
    return result

def get_all_admins(skip: int, limit: int, db: Session):
    result = db.query(models.User).filter(models.User.role == 0).offset(skip).limit(limit).all()
    return result

def get_user_by_email(email: str, db: Session):
    user = db.query(models.User).filter(models.User.email == email).first()
    return user

def get_user_by_id(id: int, db: Session):
    user = db.query(models.User).filter(models.User.user_id == id).first()
    return user
