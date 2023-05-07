export interface IStudentClassModel extends IClassModel {
  status?: number;
}

export interface IExamHistoryModel extends IExamModel {
  completedDate?: Date | string;
  score?: number;
}

export interface IClassModel {
  className?: string;
  description?: string;
  subject?: string;
}

export interface IExamModel {
  title?: string;
  type?: string;
  grade?: number;
  time?: number;
  createdDate?: Date | string;
}
