from sqlalchemy.orm import Session
from model import account as model_account
from schema import account as schema_account
from passlib.context import CryptContext
from service import account as service_account

# encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def register_student(student: schema_account.AccountCreate, db: Session):
    exist_admin = service_account.get_admin_by_email(student.email, db)
    if(exist_admin is not None):
        return False
    
    exist_account = service_account.get_account_by_email(student.email, db)
    if(exist_account is not None):
        return False

    db_account = model_account.Account(
        email = student.email,
        password = pwd_context.hash(student.password),
        name = student.name,
        is_blocked = False
    )
    db.add(db_account)
    db.commit()
    
    db_student = model_account.Student(account_id = db_account.account_id)
    db.add(db_student)
    
    db.commit()
    db.refresh(db_account)
    db.refresh(db_student)
    return True

def register_teacher(teacher: schema_account.AccountCreate, db: Session):
    exist_admin = service_account.get_admin_by_email(teacher.email, db)
    if(exist_admin is not None):
        return False
    
    exist_account = service_account.get_account_by_email(teacher.email, db)
    if(exist_account is not None):
        return False
    
    db_account = model_account.Account(
        email = teacher.email,
        password = pwd_context.hash(teacher.password),
        name = teacher.name,
        is_blocked = False
    )
    db.add(db_account)
    db.commit()
    
    db_teacher = model_account.Teacher(account_id = db_account.account_id)
    db.add(db_teacher)
    
    db.commit()
    db.refresh(db_account)
    db.refresh(db_teacher)
    return True

def register_admin(admin: schema_account.AccountCreate, db: Session):
    exist_admin = service_account.get_admin_by_email(admin.email, db)
    if(exist_admin is not None):
        return False
    
    exist_account = service_account.get_account_by_email(admin.email, db)
    if(exist_account is not None):
        return False
    
    db_admin = model_account.Admin(
        email = admin.email,
        password = pwd_context.hash(admin.password),
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return True

def get_role(id: int, db: Session):
    try:
        student = db.query(model_account.Student).filter(model_account.Student.account_id == id).first()
        if student != None:
            return 1
        
        teacher = db.query(model_account.Teacher).filter(model_account.Teacher.account_id == id).first()
        if teacher != None:
            return 2
    except Exception as error:
        error_message = str(error.args)
        print(error_message)
    return -1
        

def login(account: schema_account.AccountLogin, db: Session):
    code = "200"
    message = ""
    role = -1

    admin = service_account.get_admin_by_email(account.email, db)
    if admin != None:
        if not pwd_context.verify(account.password, admin.password):
            code = "400"
            message = "Mật khẩu không chính xác"
            return (code, message, role)
        else:
            code = "200"
            message = "Đăng nhập thành công !"
            role = 0
            return (code, message, role)

    res_acc = service_account.get_account_by_email(account.email, db)
    if res_acc == None:
        code = "400"
        message = "Không tồn tại email"
        return (code, message, role)
    
    if not pwd_context.verify(account.password, res_acc.password):
        code = "400"
        message = "Mật khẩu không chính xác"
        return (code, message, role)
    
    role = get_role(res_acc.account_id, db)
    code = "200"
    message = "Đăng nhập thành công !"
    return (code, message, role)