from pydantic import BaseModel
from .answer import AnswerInfo
from typing import Optional

class QuestionTrueAnswer(BaseModel):
    question_id: int
    true_answer: int

class QuestionBase(BaseModel):
    content: str

class QuestionCreate(QuestionBase):
    exam_id: int
    question_number: int

class QuestionUpdateTrueAnswer(BaseModel):
    question_id: int
    exam_id: int
    question_number: int

class QuestionInfo(QuestionBase, QuestionUpdateTrueAnswer):
    answer_list: list[AnswerInfo]

    class Config():
        orm_mode = True

class QuestionInfoHasTrueAnswer(QuestionInfo):
    true_answer_id: Optional[int] = None


class DoQuestion(BaseModel):
    question_id: int
    true_answer_id: int

class EditQuestion(DoQuestion):
    question_number: int
    is_delete: bool
