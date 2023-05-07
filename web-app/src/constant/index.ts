import { ClassStatus } from './enum/ClassStatus';
import { IClassModel, IExamHistoryModel, IExamModel, IStudentClassModel } from './interface/student/IStudent';

export type IStudentClass = IStudentClassModel;
export type IExamHistory = IExamHistoryModel;
export type IClass = IClassModel;
export type IExam = IExamModel;

export { ClassStatus };
