const getAccessToken = () => {
  const auth = JSON.parse(localStorage.getItem('persist:auth') || '{}');
  if (auth.token && auth.token !== 'null') {
    return JSON.parse(auth.token);
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

export { getAccessToken, getRefreshToken, getUserId, refreshTokens };
