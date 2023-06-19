import { axiosAPI as api } from './configAPI';

export const getUnreadNotification = async (user_id: number) => {
  const url = `/notification/getunreadnotification/${user_id}`;
  const result = await api({
    method: 'GET',
    url: url,
  });

  return result;
};

export const getAllNotification = async (user_id: number) => {
  const url = `/notification/getallnotification/${user_id}`;
  const result = await api({
    method: 'GET',
    url: url,
  });

  return result;
};
