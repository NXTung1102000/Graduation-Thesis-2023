from pydantic import BaseModel

class AnswerBase(BaseModel):
    content: str
    answer_number: int

class AnswerCreate(AnswerBase):
    question_id: int

class AnswerInfo(AnswerBase):
    answer_id: int
    question_id: int

    class Config():
        orm_mode = True
