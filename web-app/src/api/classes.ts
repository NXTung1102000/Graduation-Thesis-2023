import { axiosAPI as api } from './configAPI';

const getAllClassesStudentCanSee = async (student_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/student/getclassstudentcansee?student_id=${student_id}`,
  });
  return result;
};

const studentRegisterClass = async (student_id: number, class_id: number) => {
  const result = await api({
    method: 'POST',
    url: `class/student/studentregisterclass`,
    data: { student_id, class_id },
  });
  return result;
};

const getAllClassesTeacherJoined = async (teacher_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/teacher/allclassesteacherjoined?teacher_id=${teacher_id}`,
  });
  return result;
};

const getAllExamsOfClass = async (class_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/teacher/allexamofclass?class_id=${class_id}`,
  });
  return result;
};

const getAllStudentsOfClass = async (class_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/teacher/allstudentsofclass?class_id=${class_id}`,
  });
  return result;
};

const getAllTeachersOfClass = async (class_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/teacher/allteachersofclass?class_id=${class_id}`,
  });
  return result;
};

const getTeacherListCanAddToClass = async (class_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/teacher/allteachersnotjoin?class_id=${class_id}`,
  });
  return result;
};

const getStudentListCanAddToClass = async (class_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/class/teacher/allstudentsnotjoin?class_id=${class_id}`,
  });
  return result;
};

const getExamListOfUser = async (user_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/exam/examcreatedbyuser?user_id=${user_id}`,
  });
  return result;
};

const addUserListToClass = async (user_id_list: number[], teacher_id: number, class_id: number) => {
  const result = await api({
    method: 'POST',
    url: `class/teacher/teacheradduser`,
    data: { user_id_list, teacher_id, class_id },
  });
  return result;
};

const addExamToClass = async (exam_id: number, teacher_id: number, class_id: number) => {
  const result = await api({
    method: 'POST',
    url: `/class/teacher/addexamintoclass`,
    data: { exam_id, teacher_id, class_id },
  });
  return result;
};

export {
  getAllClassesStudentCanSee,
  getAllClassesTeacherJoined,
  getAllExamsOfClass,
  getAllStudentsOfClass,
  getAllTeachersOfClass,
  studentRegisterClass,
  getTeacherListCanAddToClass,
  getStudentListCanAddToClass,
  addUserListToClass,
  getExamListOfUser,
  addExamToClass,
};
