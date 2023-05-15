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

class NameSourceExam(Enum):
  TOAN_MATH = 'toanmath',
  MATH_VN = 'mathvn',
  ON_LUYEN = 'onluyen',
  TIM_DAP_AN = 'timdapan',

class UrlSourceExam(Enum):
  TOAN_MATH = 'https://toanmath.com/',
  MATH_VN = 'https://www.mathvn.com/',
  ON_LUYEN = 'https://www.onluyen.vn/',
  TIM_DAP_AN = 'https://timdapan.com/',

class TypeExam(Enum):
  MidTerm1 = 'Giữa kỳ 1',
  MidTerm2 = 'Giữa kỳ 2',
  EndTerm1 = 'Cuối kỳ 1',
  EndTerm2 = 'Cuối kỳ 2',
  Demo = 'Thi thử THPTQG',
#   Advanced = 'Học sinh giỏi',

class ClassExam(Enum):
  Class10 = 'Lớp 10',
  Class11 = 'Lớp 11',
  Class12 = 'Lớp 12',
