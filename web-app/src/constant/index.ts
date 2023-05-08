import { ClassStatus } from './enum/ClassStatus';
import {
  IClassModel,
  IExamHistoryModel,
  IExamModel,
  IStudentClassModel,
  IStudentModel,
  ITeacherModel,
} from './interface/student/IStudent';

export type IStudentClass = IStudentClassModel;
export type IExamHistory = IExamHistoryModel;
export type IClass = IClassModel;
export type IExam = IExamModel;
export type IStudent = IStudentModel;
export type ITeacher = ITeacherModel;

export { ClassStatus };
