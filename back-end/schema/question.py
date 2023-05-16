from pydantic import BaseModel
from .answer import AnswerInfo
class QuestionBase(BaseModel):
    content: str

class QuestionCreate(QuestionBase):
    exam_id: int
    question_number: int

class QuestionUpdateTrueAnswer(BaseModel):
    question_id: int
    exam_id: int
    question_number: int
    true_answer_id: int

class QuestionInfo(QuestionBase, QuestionUpdateTrueAnswer):
    answer_list: list[AnswerInfo]

    class Config():
        orm_mode = True
