from sqlalchemy.orm import Session
from model import models

def create_question(exam_id: int, content: str, question_number: int, db: Session):
    db_question = models.Question(
        exam_id = exam_id,
        content = content,
        question_number = question_number,
        true_answer_id = None,
        is_deleted = False,
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question