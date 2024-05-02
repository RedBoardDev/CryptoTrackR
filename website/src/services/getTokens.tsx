const getTokens = () => {
  const keepLoggedValue = localStorage.getItem('keepLogged');
  let refreshToken;
  let accessToken;
  let expireDate;
  let sessionToken;

  if (keepLoggedValue === 'true') {
    refreshToken = localStorage.getItem('refreshToken');
    accessToken = localStorage.getItem('accessToken');
    expireDate = localStorage.getItem('expireDate');
  } else {
    refreshToken = sessionStorage.getItem('refreshToken');
    accessToken = sessionStorage.getItem('accessToken');
    expireDate = sessionStorage.getItem('expireDate');
  }
  return {
    refreshToken, accessToken, sessionToken, expireDate,
  };
};

export default getTokens;
