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
  title?: string;
  type?: string;
  grade?: number;
  time?: number;
  subject?: string;
  createdDate?: Date | string;
}

export interface IQuestionModel {
  content?: string;
  questionNumber?: number;
  trueAnswer?: number;
  answerList?: IAnswerModel[];
}

export interface IAnswerModel {
  answerNumber?: number;
  content?: string;
}

export interface IHumanModel {
  name?: string;
  email?: string;
}

export interface IStudentModel extends IHumanModel {
  status?: ClassStatus;
}

export interface ITeacherModel extends IHumanModel {}
