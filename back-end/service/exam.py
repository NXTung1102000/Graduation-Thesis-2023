from sqlalchemy.orm import Session
from sqlalchemy import func
from model import models
from schema import exam as schema_exam
import threading

# from sqlalchemy import or_
# from . import classes as service_class
# from . import user as service_user
from . import extract as service_extract
from fastapi import UploadFile
from util.base64 import convert_to_base64, resize_img

def get_exam_by_id(exam_id: int, db: Session):
    _exam = db.query(models.Exam).filter(models.Exam.exam_id == exam_id).first()
    return _exam

def is_teacher_owns_exam(teacher_id: int, exam_id: int, db: Session):
    exam = db.query(models.Exam).filter_by(exam_id=exam_id, created_by=teacher_id).first()
    return exam is not None

def get_all_public_exams(skip: int, limit: int, db: Session):
    public_exams = db.query(models.Exam).join(models.User).filter(models.User.role == 0) \
        .offset(skip).limit(limit).all()
    return public_exams

def get_all_exam_created_by_user(user_id: int, skip: int, limit: int, db: Session):
    teacher_exams = db.query(models.Exam).filter(models.Exam.created_by == user_id).offset(skip).limit(limit).all()
    return teacher_exams

def search_exam_public(keyword: str, grade: int, type: str, skip: int, limit: int, db: Session):
    query = db.query(models.Exam).join(models.User).filter(models.User.role == 0).filter(
        func.lower(models.Exam.title).contains(keyword.lower())
    )

    if grade is not None:
        query = query.filter(models.Exam.grade == grade)

    if type is not None:
        query = query.filter(models.Exam.type == type)

    search_results = query.offset(skip).limit(limit).all()
    return search_results

def extract_thread(file: UploadFile, exam_id: int, db: Session):
    (img_full, img_page_1) = service_extract.process_get_full_img(file)
    (column, img_text_question) = service_extract.extract_cau_(img_page_1)
    (img_question_h_min, list_img_questions) = service_extract.detect_cau(img_full, img_text_question, column=column)
    (answer_A,answer_B,answer_C,answer_D) = service_extract.extract_ABCD(list_img_questions[img_question_h_min], img_text_question)
    service_extract.extract_answer(list_img_questions, exam_id, answer_A, answer_B, answer_C, answer_D, db)


def create_exam(file: UploadFile, exam: schema_exam.ExamCreate, db: Session):
    # db_user = service_user.get_user_by_id(exam.created_by, db)
    db_exam = models.Exam(
        title = exam.title,
        subject = "Toán",
        type = exam.type,
        grade = exam.grade,
        created_by = exam.created_by ,
        time = 60
    )
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    
    thread_1 = threading.Thread(target=extract_thread, args=(file, db_exam.exam_id, db, ))
    thread_1.start()
    return db_exam

def update_exam(update_exam: schema_exam.ExamUpdate, db: Session):
    code = "200"
    message = "thành công"
    db_exam = get_exam_by_id(update_exam.exam_id, db)
    if db_exam is None:
        code = "404"
        message = "không tìm thấy đề thi có id là {}".format(update_exam.exam_id)
        return(code, message)
    
    db_exam.title = update_exam.title
    db_exam.type = update_exam.type
    db_exam.grade = update_exam.grade
    db_exam.time = update_exam.time
    db.commit()
    db.refresh(db_exam)
    return(code, message)

def delete_exam(exam_id: int, db: Session):
    code = "200"
    message = "thành công"
    db_exam = get_exam_by_id(update_exam.exam_id, db)
    if db_exam is None:
        code = "404"
        message = "không tìm thấy đề thi có id là {}".format(exam_id)
        return(code, message)
    
    db_exam.is_deleted = True
    db.commit()
    db.refresh(db_exam)
    return(code, message)

