from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy.orm import joinedload
from model import models
from schema import exam as schema_exam
from schema.constant import NameSourceExam, TypeExam
from schema.question import QuestionTrueAnswer
import threading
import datetime
# from sqlalchemy import or_
# from . import classes as service_class
# from . import user as service_user
from . import extract as service_extract
from fastapi import UploadFile
from util.base64 import convert_to_base64, resize_img
from . import notification as notification_service

def get_exam_by_id(exam_id: int, db: Session):
    _exam = db.query(models.Exam).filter(models.Exam.exam_id == exam_id).filter(models.Exam.is_deleted == False).first()
    if _exam:
        _exam.question_list = [question for question in _exam.question_list if not question.is_deleted]
    # Check if the exam exists
    return _exam

def is_teacher_owns_exam(teacher_id: int, exam_id: int, db: Session):
    exam = db.query(models.Exam).filter_by(exam_id=exam_id, created_by=teacher_id).first()
    return exam is not None

def get_all_public_exams(skip: int, limit: int, db: Session):
    public_exams = db.query(models.Exam).join(models.User).filter(models.User.role == 0) \
        .filter(models.Exam.is_deleted == False).offset(skip).limit(limit).all()
    return public_exams

def get_all_exam_created_by_user(user_id: int, skip: int, limit: int, db: Session):
    teacher_exams = db.query(models.Exam).filter(models.Exam.created_by == user_id).filter(models.Exam.is_deleted == False).offset(skip).limit(limit).all()
    return teacher_exams

def get_history_do_exam(user_id: int, db: Session):
    result = db.query(models.User_Exam).filter(models.User_Exam.user_id == user_id).all()
    history = []
    for user_exam in result:
        exam_detail = db.query(models.Exam).filter(models.Exam.exam_id == user_exam.exam_id).first()
        exam_data = {
            "user_id": user_exam.user_id,
            "exam_id": user_exam.exam_id,
            "title": exam_detail.title,
            "subject": exam_detail.subject,
            "grade": exam_detail.grade,
            "time": exam_detail.time,
            "type": exam_detail.type,
            "created_at": user_exam.created_at,
            "score": user_exam.score
        }
        history.append(exam_data)

    return history

def search_exam_public(keyword: str, grade: int, type: str, skip: int, limit: int, db: Session):
    query = db.query(models.Exam).join(models.User).filter(models.User.role == 0).filter(models.Exam.is_deleted == False)\
        .filter(func.lower(models.Exam.title).contains(keyword.lower()))

    if grade is not None:
        query = query.filter(models.Exam.grade == grade)

    if type is not None:
        query = query.filter(models.Exam.type == type)

    search_results = query.offset(skip).limit(limit).all()
    return search_results

def create_exam(file: UploadFile, exam: schema_exam.ExamCreate, db: Session):
    # db_user = service_user.get_user_by_id(exam.created_by, db)
    db_exam = models.Exam(
        title = exam.title,
        subject = "Toán",
        type = exam.type,
        grade = exam.grade,
        created_by = exam.created_by ,
        is_deleted = True,
        time = 60
    )
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    
    thread_1 = threading.Thread(target=extract_from_file_thread, args=(file, db_exam.exam_id, db, ))
    thread_1.start()

    notification_service.add_notification(user_id= exam.created_by, \
            content=f"Đề thi'{exam.title}' đã được tìm thấy, bạn hãy quay lại sau khi đề thi trích xuất xong nhé", db=db)
    return db_exam

def extract_from_file_thread(file: UploadFile, exam_id: int, db: Session):
    (img_full, img_page_1) = service_extract.process_get_full_img(file)
    (column, img_text_question) = service_extract.extract_cau_(img_page_1)
    (img_question_h_min, list_img_questions) = service_extract.detect_cau(img_full, img_text_question, column=column)
    (answer_A,answer_B,answer_C,answer_D) = service_extract.extract_ABCD(list_img_questions[img_question_h_min], img_text_question)
    service_extract.extract_answer(list_img_questions, exam_id, answer_A, answer_B, answer_C, answer_D, db)

    # update status
    print("exam_id: ", exam_id)
    db_exam = db.query(models.Exam).filter(models.Exam.exam_id == exam_id).first()
    db_exam.is_deleted = False
    db.commit()
    db.refresh(db_exam)

    # push notification
    notification_service.add_notification(user_id=db_exam.created_by,\
            content=f"Đề thi'{db_exam.title}' đã trích xuất xong, bạn hãy vào danh sách đề thi quản lý và chỉnh sửa lại nhé", db=db)

def extract_from_url_thread(source_url: str, source: NameSourceExam, exam_id: int, db: Session):
    (img_full, img_page_1) = service_extract.process_download_file_and_get_full_img(source_url, source)
    (column, img_text_question) = service_extract.extract_cau_(img_page_1)
    (img_question_h_min, list_img_questions) = service_extract.detect_cau(img_full, img_text_question, column=column)
    (answer_A,answer_B,answer_C,answer_D) = service_extract.extract_ABCD(list_img_questions[img_question_h_min], img_text_question)
    service_extract.extract_answer(list_img_questions, exam_id, answer_A, answer_B, answer_C, answer_D, db)

    # update status
    db_exam = db.query(models.Exam).filter(models.Exam.exam_id == exam_id).first()
    db_exam.is_deleted = False
    db.commit()
    db.refresh(db_exam)

    # push notification
    notification_service.add_notification(user_id=db_exam.created_by,\
            content=f"Đề thi'{db_exam.title}' đã trích xuất xong, bạn hãy vào danh sách đề thi quản lý và chỉnh sửa lại nhé", db=db)

def create_exam_from_url(source_url: str, source: NameSourceExam, title: str, grade: int, type: TypeExam, created_by: int, db: Session):
    db_exam = models.Exam(
        title = title,
        subject = "Toán",
        type = type,
        grade = grade,
        created_by = created_by,
        is_deleted = True,
        time = 60
    )
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    
    thread_2 = threading.Thread(target=extract_from_url_thread, args=(source_url, source, db_exam.exam_id, db, ))
    thread_2.start()

    notification_service.add_notification(user_id= created_by, \
            content=f"Đề thi'{title}' đã được tạo, bạn hãy quay lại sau khi đề thi trích xuất xong nhé", db=db)
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

def user_do_exam(user_id: int, exam_id: int, list_questions: list[QuestionTrueAnswer], db: Session):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    exam = db.query(models.Exam).filter(models.Exam.exam_id == exam_id).first()
    questions = db.query(models.Question).filter(models.Question.exam_id == exam_id).filter(models.Question.is_deleted == False).all()
    if not user or not exam or not questions:
        return None
    
    num_true_answer = 0
    total_questions = len(questions)
    score_percentage = float(0)

    for i_question in list_questions:
        question_in_db = db.query(models.Question).filter(models.Question.question_id == i_question.question_id).first()
        if question_in_db is None:
            continue
        elif i_question.true_answer == question_in_db.true_answer_id:
            num_true_answer += 1
    
    if total_questions > 0:
        score_percentage = (num_true_answer / total_questions) * 10


    # update into DB
    exist_db_history_do_exam = db.query(models.User_Exam).filter(models.User_Exam.user_id == user_id)\
                                                    .filter(models.User_Exam.exam_id == exam_id).first()
    if exist_db_history_do_exam is not None:
        exist_db_history_do_exam.score = score_percentage
        exist_db_history_do_exam.created_at = datetime.datetime.now()
    else:
        db_history_do_exam = models.User_Exam(
            user_id = user_id,
            exam_id = exam_id,
            score = score_percentage
        )
        db.add(db_history_do_exam)
    db.commit()
    return score_percentage


def user_update_answer_of_exam(user_id: int, exam_id: int, time: int,\
                               list_questions: list[QuestionTrueAnswer], list_delete_questions: list[int], db: Session):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    exam = db.query(models.Exam).filter(models.Exam.exam_id == exam_id).first()
    exam.time = time
    questions = db.query(models.Question).filter(models.Question.exam_id == exam_id).filter(models.Question.is_deleted == False).all()
    if not user or not exam or not questions:
        return False
    
    # add true_answer into question
    print("add true_answer into question")
    for i_question in list_questions:
        question_in_db = db.query(models.Question).filter(models.Question.question_id == i_question.question_id).first()
        if question_in_db is None:
            continue
        else:
            question_in_db.true_answer_id = i_question.true_answer

    # delete question
    print("delete question")
    for _id in list_delete_questions:
        question_in_db = db.query(models.Question).filter(models.Question.question_id == _id).first()
        if question_in_db:
            question_in_db.is_deleted = True
    db.commit()
    return True
