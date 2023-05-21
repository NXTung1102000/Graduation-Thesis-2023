from pydantic import BaseModel
from .question import QuestionInfo

class ExamBase(BaseModel):
    title: str
    type: str
    grade: int

class ExamCreate(ExamBase):
    created_by: int

class ExamUpdate(ExamCreate):
    exam_id: int
    time: int

class ExamInfo(ExamUpdate):
    exam_id: int
    subject: str
    created_at: str

    # question_list: list[QuestionInfo]

    class Config():
        orm_mode = True

    @classmethod
    def from_orm(cls, exam):
        exam.created_at = exam.created_at.strftime('%d-%m-%Y %H:%M:%S')
        return super().from_orm(exam)
    
class ExamDetail(ExamInfo):
    question_list: list[QuestionInfo]