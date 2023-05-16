import { axiosAPI as api } from './configAPI';

const getAllUsers = async (skip = 0, limit = 100) => {
  const result = await api({
    method: 'GET',
    url: `/user/allusers?skip=${skip}&limit=${limit}`,
  });
  return result;
};

const getAllStudents = async (skip = 0, limit = 100) => {
  const result = await api({
    method: 'GET',
    url: `/user/allstudents?skip=${skip}&limit=${limit}`,
  });
  return result;
};

const getAllTeachers = async (skip = 0, limit = 100) => {
  const result = await api({
    method: 'GET',
    url: `/user/allteachers?skip=${skip}&limit=${limit}`,
  });
  return result;
};

const getAllAdmins = async (skip = 0, limit = 100) => {
  const result = await api({
    method: 'GET',
    url: `/user/alladmins?skip=${skip}&limit=${limit}`,
  });
  return result;
};

export { getAllAdmins, getAllStudents, getAllTeachers, getAllUsers };
