const getAccessToken = () => {
  const auth = JSON.parse(localStorage.getItem('persist:auth') || '{}');
  if (auth.access_token && auth.access_token !== 'null') {
    return JSON.parse(auth.access_token);
  }
  return null;
};

const getRefreshToken = () => {
  const auth = JSON.parse(localStorage.getItem('persist:auth') || '{}');
  if (auth.token && auth.token !== 'null') {
    return auth.token.replace(`"`, '');
  }
  return null;
};

const getUserId = () => {
  const auth = JSON.parse(localStorage.getItem('persist:auth') || '{}');
  if (auth) {
    const user = JSON.parse(auth.user);
    return user?.id;
  }
  return null;
};

const refreshTokens = (tokens: string) => {
  const auth = JSON.parse(localStorage.getItem('persist:auth') || '{}');
  if (auth.user !== 'null') {
    const user = JSON.parse(auth.user);
    user.tokens = tokens;
    localStorage.setItem('persist:auth', JSON.stringify({ ...auth, user: JSON.stringify(user) }));
  }
};

const combineClassName: (preClassName: string, propsClassName?: string) => string = (preClassName, propsClassName) => {
  return [preClassName, propsClassName].filter((preClassName) => !!preClassName).join(' ');
};

const formatDateTime: (date: Date) => string = (date) => {
  var day: string | number, month: string | number, year: any;
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return `${day}/${month}/${year}`;
};

export { combineClassName, getAccessToken, getRefreshToken, getUserId, refreshTokens, formatDateTime };
