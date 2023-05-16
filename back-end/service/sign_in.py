from sqlalchemy.orm import Session
from model import models
from schema import user as scheme_user
from service import user as service_user
from passlib.context import CryptContext

# encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def register(user: scheme_user.UserCreate, role_user: int, db: Session):
    exit_user = service_user.get_user_by_email(user.email, db)
    if(exit_user is not None):
        return False

    db_user = models.User(
        email = user.email,
        password = pwd_context.hash(user.password),
        name = user.name,
        role = role_user,
        is_blocked = False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return True

def login(user: scheme_user.UserLogin, db: Session):
    code = "200"
    message = ""
    role = -1

    user_db = service_user.get_user_by_email(user.email, db)
    if user_db == None:
        code = "400"
        message = "Không tồn tại email"
        return (code, message, role)
    
    if not pwd_context.verify(user.password, user_db.password):
        code = "400"
        message = "Mật khẩu không chính xác"
        return (code, message, role)
    
    role = user_db.role
    code = "200"
    message = "Đăng nhập thành công !"
    return (code, message, role, user_db)