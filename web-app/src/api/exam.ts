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

const getDetailExamForEdit = async (exam_id: number) => {
  // has true answer for question
  const result = await api({
    method: 'GET',
    url: `/exam/getdetailexamforedit?exam_id=${exam_id}`,
  });

  return result;
};

const createExamAPIv1 = async (formData: FormData) => {
  const result = await api({
    method: 'POST',
    url: `/exam/apiv1/createexam`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000 * 1000,
  });

  return result;
};

export {
  createExamAPIv1,
  getAllExamsOfUser,
  getAllPublicExams,
  getDetailExamForDo,
  getDetailExamForEdit,
  searchIntegration,
  searchIntegrationOneWeb,
  searchPublicExams,
};
