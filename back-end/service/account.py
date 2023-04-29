from sqlalchemy.orm import Session
from model import account

def get_all_accounts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(account.Account).offset(skip).limit(limit).all()

def get_all_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(account.Student).offset(skip).limit(limit).all()

def get_all_teachers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(account.Teacher).offset(skip).limit(limit).all()

def get_all_admins(db: Session, skip: int = 0, limit: int = 100):
    return db.query(account.Admin).offset(skip).limit(limit).all()