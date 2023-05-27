from pydantic import BaseModel
from typing import Optional
from .constant import NameSourceExam, TypeExam, GradeExam

class RequestSearchIntegration(BaseModel):
    type:Optional[TypeExam] = None
    grade:Optional[GradeExam] = None # 10, 11, 12
    keyword:Optional[str]=None
    page: Optional[int]=1

class ResponseSearchIntegration(BaseModel):
    title:str
    link:str
    type:Optional[TypeExam] # = None
    grade:Optional[GradeExam] # = None # 10, 11, 12
    date:Optional[str] = None
    source:Optional[NameSourceExam] = None