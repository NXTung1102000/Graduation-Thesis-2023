import { IQuestionAnswer } from '../constant';
import { axiosAPI as api } from './configAPI';

const searchIntegrationOneWeb = async (
  web: string,
  requestBody: { keyword: string; type?: string; grade?: number; page: number },
) => {
  const url = `/integration/search/${web}`;
  const result = await api({
    method: 'POST',
    data: requestBody,
    url: url,
  });

  return result;
};

const searchIntegration = async (requestBody: { keyword: string; type?: string; grade?: number; page: number }) => {
  const url = `/integration/searchintegration`;
  const result = await api({
    method: 'POST',
    data: requestBody,
    url: url,
  });

  return result;
};

const getAllPublicExams = async () => {
  const result = await api({
    method: 'GET',
    url: `/exam/allpublicexam`,
  });

  return result;
};

const searchPublicExams = async (keyword?: string, grade?: string, type?: string) => {
  let params = '';
  if (keyword) params += `keyword=${keyword}`;
  if (grade) params += `grade=${grade}`;
  if (type) params += `type=${type}`;

  const result = await api({
    method: 'GET',
    url: `/exam/searchexam?${params}`,
  });

  return result;
};

const getAllExamsOfUser = async (user_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/exam/examcreatedbyuser?user_id=${user_id}`,
  });

  return result;
};

const getDetailExamForDo = async (exam_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/exam/getdetailexamfordo?exam_id=${exam_id}`,
  });

  return result;
};

const getHistoryDoExam = async (user_id: number) => {
  const result = await api({
    method: 'GET',
    url: `/exam/gethisorydoexam?user_id=${user_id}`,
  });

  return result;
};

const userDoExam = async (user_id: number, exam_id: number, list_questions: IQuestionAnswer[]) => {
  const result = await api({
    method: 'POST',
    url: `/exam/doexam`,
    data: { user_id, exam_id, list_questions },
  });
  return result;
};

const getDetailExamForEdit = async (exam_id: number) => {
  // has true answer for question
  const result = await api({
    method: 'GET',
    url: `/exam/getdetailexamforedit?exam_id=${exam_id}`,
  });

  return result;
};

const userUpdateExam = async (
  user_id: number,
  exam_id: number,
  time: number,
  list_questions: IQuestionAnswer[],
  list_delete_questions: number[],
) => {
  const result = await api({
    method: 'POST',
    url: `/examupdateanswerofexam`,
    data: { user_id, exam_id, time, list_questions, list_delete_questions },
  });
  return result;
};

const createExamAPIv1 = async (formData: FormData) => {
  const result = await api({
    method: 'POST',
    url: `/exam/apiv1/createexam`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return result;
};

const createExamFromUrlAPIv1 = async (
  source_url: string,
  source: string,
  title: string,
  type: string,
  grade: number,
  created_by: number,
) => {
  const result = await api({
    method: 'POST',
    url: `/exam/apiv1/createexamfromurl`,
    data: { source_url, source, title, type, grade, created_by },
  });

  return result;
};

export {
  createExamAPIv1,
  createExamFromUrlAPIv1,
  getAllExamsOfUser,
  getAllPublicExams,
  getDetailExamForDo,
  getDetailExamForEdit,
  getHistoryDoExam,
  searchIntegration,
  searchIntegrationOneWeb,
  searchPublicExams,
  userUpdateExam,
  userDoExam,
};
