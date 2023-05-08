from sqlalchemy.orm import Session
from model import account as model_account

def get_all_accounts(skip: int, limit: int, db: Session):
    result = db.query(model_account.Account).offset(skip).limit(limit).all()
    return result

def get_all_students(skip: int, limit: int, db: Session):
    result = db.query(model_account.Student).offset(skip).limit(limit).all()
    return result

def get_all_teachers(skip: int, limit: int, db: Session):
    result = db.query(model_account.Teacher).offset(skip).limit(limit).all()
    return result

def get_all_admins(skip: int, limit: int, db: Session):
    result = db.query(model_account.Admin).offset(skip).limit(limit).all()
    return result

def get_admin_by_email(email: str, db: Session):
    admin = db.query(model_account.Admin).filter(model_account.Admin.email == email).first()
    return admin

def get_account_by_email(email: str, db: Session):
    acc = db.query(model_account.Account).filter(model_account.Account.email == email).first()
    return acc

def get_admin_by_id(id: int, db: Session):
    admin = db.query(model_account.Admin).filter(model_account.Admin.admin_id == id).first()
    return admin

def get_account_by_id(id: int, db: Session):
    acc = db.query(model_account.Account).filter(model_account.Account.account_id == id).first()
    return acc