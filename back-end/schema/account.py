from pydantic import BaseModel

class AccountBase(BaseModel):
    name: str
    email: str

class AccountLogin(BaseModel):
    email: str
    password: str

class AccountCreate(AccountBase):
    password: str

class Account(AccountBase):
    account_id: int
    class Config():
        orm_mode = True

class Student(BaseModel):
    student_id: int
    detail_student: Account
    class Config():
        orm_mode = True


class Teacher(BaseModel):
    teacher_id: int
    detail_teacher: Account
    class Config():
        orm_mode = True

class AdminBase(BaseModel):
    email: str
    name: str
    class Config():
        orm_mode = True