from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.types import NVARCHAR, TEXT
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.db import Base
from sqlalchemy.dialects.mysql import LONGTEXT

class User(Base):
    """
        role = 0: admin
        role = 1: student
        role = 2: teacher
    """
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    name = Column(NVARCHAR(255))
    role = Column(Integer)
    is_blocked = Column(Boolean, default=False)

    class_list = relationship("Class", secondary="user_class", back_populates="users_join")
    exam_list = relationship("Exam", secondary="user_exam", back_populates="users_do")
    noti_list = relationship("Notification", back_populates="user_detail")

class Class(Base):
    __tablename__ = "class"

    class_id = Column(Integer, primary_key=True, index=True)
    created_by = Column(Integer, ForeignKey("user.user_id"))
    name = Column(NVARCHAR(255))
    description = Column(String(255))
    is_deleted = Column(Boolean, default=False)

    users_join = relationship("User", secondary="user_class", back_populates="class_list")
    exam_list = relationship("Exam", secondary="exam_class", back_populates="class_list")
    owner = relationship("User", foreign_keys=[created_by])

class Exam(Base):
    __tablename__ = "exam"

    exam_id = Column(Integer, primary_key=True, index=True)
    created_by = Column(Integer, ForeignKey("user.user_id"))
    title = Column(NVARCHAR(255))
    subject = Column(NVARCHAR(255), default="Toán")
    type = Column(String(255))
    grade = Column(Integer)
    time = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_deleted = Column(Boolean, default=False)

    users_do = relationship("User", secondary="user_exam", back_populates="exam_list")
    class_list = relationship("Class", secondary="exam_class", back_populates="exam_list")
    question_list = relationship("Question", back_populates="exam")

class Question(Base):
    __tablename__ = "question"

    question_id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("exam.exam_id"))
    content = Column(LONGTEXT)
    question_number = Column(Integer)
    true_answer_id = Column(Integer, ForeignKey("answer.answer_id"))
    is_deleted = Column(Boolean, default=False)

    exam = relationship("Exam", back_populates="question_list", foreign_keys=[exam_id])
    answer_list = relationship("Answer", back_populates="question", primaryjoin="Question.question_id == Answer.question_id")
    true_answer = relationship("Answer", uselist=False, foreign_keys=[true_answer_id])


class Answer(Base):
    __tablename__ = "answer"

    answer_id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("question.question_id"))
    answer_number = Column(Integer)
    content = Column(LONGTEXT)

    question = relationship("Question", back_populates="answer_list", foreign_keys=[question_id])

class User_Class(Base):
    """
        status = 0: Not
        status = 1: Joined
        status = 2: Pending
    """
    __tablename__ = "user_class"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    class_id = Column(Integer, ForeignKey("class.class_id"), primary_key=True)
    status = Column(Integer)

class User_Exam(Base):
    __tablename__ = "user_exam"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    exam_id = Column(Integer, ForeignKey("exam.exam_id"), primary_key=True)
    score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    exam_detail = relationship("Exam",foreign_keys=[exam_id], viewonly=True)

class Exam_Class(Base):
    __tablename__ = "exam_class"

    class_id = Column(Integer, ForeignKey("class.class_id"), primary_key=True)
    exam_id = Column(Integer, ForeignKey("exam.exam_id"), primary_key=True)

class Notification(Base):
    __tablename__ = "notification"

    noti_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    is_read = Column(Boolean, default=False)
    content = Column(String(255))

    user_detail = relationship("User", back_populates="noti_list", foreign_keys=[user_id])