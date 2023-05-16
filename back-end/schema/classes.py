from pydantic import BaseModel
from .user import UserInfo
from .exam import ExamInfo

class ClassBase(BaseModel):
    name: str
    description: str

class ClassCreate(ClassBase):
    created_by: int

class ClassInfo(ClassBase):
    class_id: int
    created_by: int

    owner: UserInfo
    # exam_list: list[ExamInfo]
    # users_join: list[UserInfo]

    class Config():
        orm_mode = True

class ClassStatus(ClassCreate):
    class_id: int
    status: int
    owner: UserInfo

    class Config():
        orm_mode = True
