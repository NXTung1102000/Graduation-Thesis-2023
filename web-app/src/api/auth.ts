import { ICreateUser, IInputUser } from '../constant/interface/user';
import { axiosAPI as api } from './configAPI';

const registerAPI = async (registerInfo: ICreateUser) => {
  const registerResult = await api({
    method: 'POST',
    url: '/register_student',
    data: registerInfo,
  });
  return registerResult;
};

const loginAPI = async (credentials: IInputUser) => {
  const loginResult = await api({
    method: 'POST',
    url: '/login/',
    data: credentials,
  });
  return loginResult;
};

const forgetPasswordAPI = async (username: string, email: string) => {
  const forgetPasswordResult = await api({
    method: 'POST',
    url: '/forget-pw',
    data: { username, email },
  });
  return forgetPasswordResult;
};

const changePasswordAPI = async (oldPW: string, newPW: string) => {
  const result = await api({
    method: 'POST',
    url: '/change-password',
    data: { oldPW, newPW },
  });
  return result;
};

const createAccountTeacher = async (createInfo: ICreateUser) => {
  const createResult = await api({
    method: 'POST',
    url: '/register_teacher',
    data: createInfo,
  });
  return createResult;
};

const createAccountAdmin = async (createInfo: ICreateUser) => {
  const createResult = await api({
    method: 'POST',
    url: '/register_admin',
    data: createInfo,
  });
  return createResult;
};

export { changePasswordAPI, createAccountAdmin, createAccountTeacher, forgetPasswordAPI, loginAPI, registerAPI };
