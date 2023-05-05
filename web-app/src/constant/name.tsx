export const name = 'Thi thử Toán trực tuyến';
export const welcome = 'Chào mừng đến với ứng dụng Thi thử trực tuyến';
export const group = 'Đồ án tốt nghiệp HUST 2022-2';

export enum NameSourceExam {
  TOAN_MATH = 'toanmath',
  MATH_VN = 'mathvn',
  ON_LUYEN = 'onluyen',
  TIM_DAP_AN = 'timdapan',
}

export enum UrlSourceExam {
  TOAN_MATH = 'https://toanmath.com/',
  MATH_VN = 'https://www.mathvn.com/',
  ON_LUYEN = 'https://www.onluyen.vn/',
  TIM_DAP_AN = 'https://timdapan.com/',
}

export enum TypeExam {
  MidTerm1 = 'Giữa kỳ 1',
  MidTerm2 = 'Giữa kỳ 2',
  EndTerm1 = 'Cuối kỳ 1',
  EndTerm2 = 'Cuối kỳ 2',
  Demo = 'Thi thử THPTQG',
  // Advanced = 'Học sinh giỏi',
}

export const typeExamList = [
  TypeExam.MidTerm1,
  TypeExam.MidTerm2,
  TypeExam.EndTerm1,
  TypeExam.EndTerm2,
  TypeExam.Demo,
  //   TypeExam.Advanced,
];

export enum ClassExam {
  Class10 = 'Lớp 10',
  Class11 = 'Lớp 11',
  Class12 = 'Lớp 12',
}

export const classList = [ClassExam.Class10, ClassExam.Class11, ClassExam.Class12];
