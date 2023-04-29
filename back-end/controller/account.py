from fastapi import APIRouter, Depends, HTTPException
from service import account as service_account
from sqlalchemy.orm import Session
from config.db import get_db
from schema import account as schema_account

API_account = APIRouter(prefix="/account", tags=["Account"])

@API_account.get('/accounts')
async def get_all_accounts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service_account.get_all_accounts(db, skip=skip, limit=limit)

@API_account.get('/students', response_model=schema_account.Student)
async def get_all_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service_account.get_all_students(db, skip=skip, limit=limit)

@API_account.get('/teachers', response_model=schema_account.Teacher)
async def get_all_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service_account.get_all_teachers(db, skip=skip, limit=limit)

@API_account.get('/admins')
async def get_all_admins(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service_account.get_all_admins(db, skip=skip, limit=limit)