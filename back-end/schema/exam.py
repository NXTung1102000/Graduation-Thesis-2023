from pydantic import BaseModel
from .question import QuestionInfo

class ExamBase(BaseModel):
    title: str
    type: str
    grade: int

class ExamCreate(ExamBase):
    created_by: int

class ExamUpdate(ExamCreate):
    time: int

class ExamInfo(ExamUpdate):
    exam_id: int
    subject: str
    created_at: str

    question_list: list[QuestionInfo]

    class Config():
        orm_mode = True