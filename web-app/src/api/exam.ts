import { axiosAPI as api } from './configAPI';

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

const getDetailExamForEdit = async (exam_id: number) => {
  // has true answer for question
  const result = await api({
    method: 'GET',
    url: `/exam/getdetailexamforedit?exam_id=${exam_id}`,
  });

  return result;
};

export { getAllExamsOfUser, getAllPublicExams, getDetailExamForDo, getDetailExamForEdit, searchPublicExams };
