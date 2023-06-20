import { ClassStatus } from '../../enum/ClassStatus';

export interface IStudentClassModel extends IClassModel {
  status?: number;
}

export interface IExamHistoryModel extends IExamModel {
  completedDate?: Date | string;
  score?: number;
}

export interface IClassModel {
  class_id: number;
  name?: string;
  description?: string;
  owner?: ITeacherModel;
}

export interface IExamModel {
  exam_id?: number;
  title?: string;
  type?: string;
  grade?: number;
  time?: number;
  subject?: string;
  created_at?: Date | string;
}

export interface IQuestionModel {
  question_id?: number;
  content?: string;
  question_number?: number;
  true_answer_id?: number;
  answer_list?: IAnswerModel[];
  exam_id?: number;
}

export interface IAnswerModel {
  answer_id?: number;
  answer_number?: number;
  content?: string;
  question_id?: number;
}

export interface IHumanModel {
  name?: string;
  email?: string;
  user_id?: number;
}

export interface IStudentModel extends IHumanModel {
  status?: ClassStatus;
}

export interface ITeacherModel extends IHumanModel {}
