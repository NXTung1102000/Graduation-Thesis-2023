from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .variable import SQLALCHEMY_DATABASE_URI
# from util.jwt import hash_password
# from model import models

engine = create_engine(SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# default_pw = "ABcd1234"

Base = declarative_base()
def get_db():
    db = SessionLocal()
    # for idx in range(1, 31):
    #     db_student = models.User(
    #         email = "email_student_{}@gmail.com".format(str(idx).zfill(3)),
    #         password = hash_password(default_pw),
    #         name = "Student {}".format(str(idx).zfill(3)),
    #         role = 1
    #     )
    #     db.add(db_student)

    # for idx in range(1, 11):
    #     db_teacher = models.User(
    #         email = "email_teacher_{}@gmail.com".format(str(idx).zfill(3)),
    #         password = hash_password(default_pw),
    #         name = "Teacher {}".format(str(idx).zfill(3)),
    #         role = 2
    #     )
    #     db.add(db_teacher)
    
    # for idx in range(1, 4):
    #     db_admin = models.User(
    #         email = "email_admin_{}@gmail.com".format(str(idx).zfill(3)),
    #         password = hash_password(default_pw),
    #         name = "Admin {}".format(str(idx).zfill(3)),
    #         role = 0
    #     )
    #     db.add(db_admin)
    db.commit()
    try:
        yield db
    finally:
        db.close()

