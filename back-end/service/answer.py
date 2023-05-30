from sqlalchemy.orm import Session
from model import models

def create_answer(question_id: int, content: str, answer_number: int, db: Session):
    exist_answer = db.query(models.Answer) \
        .filter(models.Answer.answer_number == answer_number)\
        .filter(models.Answer.question_id == question_id).first()
    
    if exist_answer is not None:
        db.delete(exist_answer)
    db_answer = models.Answer(
        question_id = question_id,
        answer_number = answer_number,
        content = content
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return True