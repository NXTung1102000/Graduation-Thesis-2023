from enum import Enum

# class syntax
class Role(Enum):
    Admin = 0
    Student = 1
    Teacher = 2

class ClassStatus(Enum):
    Not = 0,
    Joined = 1,
    Pending = 2,

class NameSourceExam(str, Enum):
  TOAN_MATH = 'toanmath',
  MATH_VN = 'mathvn',
  ON_LUYEN = 'onluyen',
  TIM_DAP_AN = 'timdapan',

class UrlSourceExam(str, Enum):
  TOAN_MATH = 'https://toanmath.com/',
  MATH_VN = 'https://www.mathvn.com/',
  ON_LUYEN = 'https://www.onluyen.vn/',
  TIM_DAP_AN = 'https://timdapan.com/',

class TypeExam(str, Enum):
  MidTerm1 = 'Giữa kỳ 1',
  MidTerm2 = 'Giữa kỳ 2',
  EndTerm1 = 'Cuối kỳ 1',
  EndTerm2 = 'Cuối kỳ 2',
  Demo = 'Thi thử THPTQG',
#   Advanced = 'Học sinh giỏi',

class GradeExam(int, Enum):
  Grade10 = 10,
  Grade11 = 11,
  Grade12 = 12,
