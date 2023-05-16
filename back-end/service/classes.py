from sqlalchemy.orm import Session
from model import models
from schema import classes as schema_class
from schema.constant import ClassStatus

def get_class_by_id(class_id: int, db: Session):
    _class = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    return _class

def get_all_classes(db: Session):
    result = db.query(models.Class).all()
    return result

def get_all_classes_of_teacher(teacher_id: int, db: Session):
    result = db.query(models.Class).filter(models.Class.created_by == teacher_id).all()
    return result

def get_all_classes_user_joined(user_id: int, db: Session):
    result = db.query(models.Class)\
        .join(models.User_Class, (models.Class.class_id == models.User_Class.class_id) & (models.User_Class.user_id == user_id))  \
    .all()
    return result

def get_all_students_of_class(class_id, db: Session):
    student_list = db.query(models.User, models.User_Class.status) \
    .join(models.User_Class, (models.User.user_id == models.User_Class.user_id) & (models.User_Class.class_id == class_id))  \
    .filter(
        models.User.role == 1
    ) \
    .order_by(models.User_Class.status.desc()) \
    .all()
    
    result = []
    for _student_obj, status in student_list:
        if status is None:
            status = ClassStatus.Not.value[0]
        result.append({
            'user_id': _student_obj.user_id,
            'email': _student_obj.email,
            'name': _student_obj.name,
            'status': status
        })
    return result

def get_all_teachers_of_class(class_id, db: Session):
    result = db.query(models.User) \
    .join(models.User_Class, (models.User.user_id == models.User_Class.user_id) & (models.User_Class.class_id == class_id))  \
    .filter(
        models.User.role == 2
    ).all()
    return result

def get_all_exams_of_class(class_id, db: Session):
    result = db.query(models.Exam) \
    .join(models.Exam_Class, (models.Exam.exam_id == models.Exam_Class.exam_id) & (models.Exam_Class.class_id == class_id))  \
    .all()
    return result

def get_class_student_can_see(student_id: int, db:Session):
    classes = db.query(models.Class, models.User_Class.status) \
        .outerjoin(models.User_Class, (models.Class.class_id == models.User_Class.class_id) & (models.User_Class.user_id == student_id)) \
        .filter(models.Class.is_deleted == False) \
        .order_by(models.User_Class.status.desc()) \
        .all()
    
    result = []
    for class_obj, status in classes:
        if status is None:
            status = ClassStatus.Not.value[0]
        owner = db.query(models.User).filter(models.User.user_id == class_obj.created_by).first()
        result.append({
            'class_id': class_obj.class_id,
            'created_by': class_obj.created_by,
            'name': class_obj.name,
            'description': class_obj.description,
            'status': status,
            'owner': owner
        })
    return result

def create_class(class_create: schema_class.ClassCreate, db: Session):
    db_class = models.Class(
        created_by = class_create.created_by,
        name = class_create.name,
        description = class_create.description,
        is_deleted = False
    )
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    
    db_user_class = models.User_Class(
        user_id = class_create.created_by,
        class_id = db_class.class_id,
        status = ClassStatus.Joined.value[0]
    )
    db.add(db_user_class)
    db.commit()
    db.refresh(db_user_class)
    return True

def delete_class(teacher_id: int, class_id: int, db: Session):
    code = "200"
    message = "thành công"
    db_class = get_class_by_id(class_id)
    if db_class is None:
        code = "404"
        message = "không tìm thấy lớp có id là {}".format(class_id)
        return(code, message)
    
    if db_class.created_by != teacher_id:
        code = "403"
        message = "Giáo viên {} không sở hữu lớp này".format(teacher_id)
        return(code, message)
    
    db_class.is_deleted = True
    db.commit()
    db.refresh(db_class)
    return(code, message) 

def student_register_class(student_id: int, class_id: int, db: Session):
    _exist_student_class = db.query(models.User_Class) \
    .filter(
        models.User_Class.class_id == class_id,
        models.User_Class.user_id == student_id
    ).first()
    if _exist_student_class is None:
        db_student_class = models.User_Class(
            user_id = student_id,
            class_id = class_id,
            status = ClassStatus.Pending.value[0]
        )
        db.add(db_student_class)
        db.commit()
        db.refresh(db_student_class)
        code = "200"
        message = "đăng ký lớp thành công"
        return(code, message) 
    
    if _exist_student_class.status == ClassStatus.Not.value[0]:
        _exist_student_class.status = ClassStatus.Pending.value[0]
        db.commit()
        db.refresh(_exist_student_class)
        code = "200"
        message = "đăng ký lớp thành công"
        return(code, message)
    
    code = "400"
    if _exist_student_class.status == ClassStatus.Joined.value[0]:
        message = "bạn đã tham gia lớp rồi"
        return(code, message)
    
    if _exist_student_class.status == ClassStatus.Pending.value[0]:
        message = "bạn đã gửi đăng ký, chờ giáo viên lớp xác nhận"
        return(code, message)
    
    code = "500"
    message = "Lỗi hệ thống"
    return(code, message)

def teacher_accept_student(student_id: int, teacher_id: int, class_id: int, db: Session):
    code = "200"
    message = "thành công"

    _is_teacher_join_class = db.query(models.User_Class).filter(
        models.User_Class.class_id == class_id,
        models.User_Class.user_id == teacher_id
    ).first()
    if _is_teacher_join_class is None:
        code = "403"
        message = "giáo viên {} chưa tham gia lớp này".format(teacher_id)
        return (code, message)
    
    _exist_student_class = db.query(models.User_Class).filter(
        models.User_Class.class_id == class_id,
        models.User_Class.user_id == student_id
    ).first()

    if _exist_student_class is None or _exist_student_class.status == ClassStatus.Not.value[0]:
        code = "400"
        message = "học sinh {} không yêu cầu tham gia lớp này".format(student_id)
        return (code, message)
    
    if _exist_student_class.status == ClassStatus.Joined.value[0]:
        code = "400"
        message = "học sinh {} đã tham gia lớp này".format(student_id)
        return (code, message)

    if _exist_student_class.status == ClassStatus.Joined.value[0]:
        _exist_student_class.status = ClassStatus.Joined.value[0]
        db.commit()
        db.refresh(_exist_student_class)
        code = "200"
        message = "thêm học sinh {} thành công".format(student_id)
        return (code, message)
    
    code = "500"
    message = "Lỗi hệ thống"
    return(code, message)

def teacher_add_user(user_id_list: list[int], teacher_id: int, class_id: int, db: Session):
    # print(user_id_list, teacher_id, class_id)
    _is_teacher_join_class = db.query(models.User_Class).filter(
        models.User_Class.class_id == class_id,
        models.User_Class.user_id == teacher_id
    ).first()
    if _is_teacher_join_class is None:
        code = "403"
        message = "giáo viên {} chưa tham gia lớp này".format(teacher_id)
        return (code, message)
    
    for _user_id in user_id_list:
        # print(_user_id)
        _exist_user_class = db.query(models.User_Class).filter(
            models.User_Class.class_id == class_id,
            models.User_Class.user_id == _user_id
        ).first()

        if _exist_user_class is None:
            db_user_class = models.User_Class(
                user_id = _user_id,
                class_id = class_id,
                status = ClassStatus.Joined.value[0]
            )
            db.add(db_user_class)
            db.commit()
            db.refresh(db_user_class)

        else:
            _exist_user_class.status = ClassStatus.Joined.value[0]
            db.commit()
            db.refresh(_exist_user_class)

    code = "200"
    message = "thêm thành công"
    return (code, message)

