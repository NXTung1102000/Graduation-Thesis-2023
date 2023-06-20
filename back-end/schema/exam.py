from pydantic import BaseModel
from .question import QuestionInfo, QuestionInfoHasTrueAnswer, DoQuestion, EditQuestion

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
    subject: str
    created_at: str

    # question_list: list[QuestionInfo]

    class Config():
        orm_mode = True

    @classmethod
    def from_orm(cls, exam):
        exam.created_at = str(exam.created_at)
        return super().from_orm(exam)
    
class ExamDetail(ExamInfo):
    question_list: list[QuestionInfo]

class ExamDetailHasTrueAnswer(ExamInfo):
    question_list: list[QuestionInfoHasTrueAnswer]

class DoExam:
    exam_id: int
    question_list: list[DoQuestion]

class EditExam:
    exam_id: int
    time: int
    question_list: list[EditQuestion]