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

export {
  getAllClassesStudentCanSee,
  getAllClassesTeacherJoined,
  getAllStudentsOfClass,
  getAllTeachersOfClass,
  studentRegisterClass,
};
