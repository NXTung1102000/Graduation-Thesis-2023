from pydantic import BaseModel

class StudentBase(BaseModel):
    name: str
    email: str

class StudentCreate(StudentBase):
    password: str

class Student(StudentBase):
    student_id: int
    is_blocked: bool
    account_id: int
    class Config:
        orm_mode = True


class TeacherBase(BaseModel):
    name: str
    email: str

class TeacherCreate(TeacherBase):
    password: str

class Teacher(TeacherBase):
    teacher_id: int
    is_blocked: bool
    account_id: int
    class Config:
        orm_mode = True