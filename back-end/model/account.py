from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from config.db import Base

class Admin(Base):
    __tablename__ = "admin"

    admin_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    name = Column(String(255))

class Account(Base):
    __tablename__ = "account"

    account_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    name = Column(String(255))
    is_blocked = Column(Boolean, default=False)

    student = relationship("Student", back_populates="detail_student")
    teacher = relationship("Teacher", back_populates="detail_teacher")



class Student(Base):
    __tablename__ = "student"

    student_id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("account.account_id"))

    detail_student = relationship("Account", back_populates="student")

class Teacher(Base):
    __tablename__ = "teacher"

    teacher_id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("account.account_id"))

    detail_teacher = relationship("Account", back_populates="teacher")
