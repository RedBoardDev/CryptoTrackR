const saveTokens = (
  accessToken: string,
  expiresIn: number,
  keepLogged?: boolean,
  refreshToken?: string,
) => {
  if (keepLogged !== undefined) {
    localStorage.setItem('keepLogged', keepLogged.toString());
  }
  const keepLoggedValue = localStorage.getItem('keepLogged');
  if (keepLoggedValue === 'true') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem(
      'expireDate',
      (expiresIn + Math.floor(Date.now() / 1000)).toString(),
    );
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  } else {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem(
      'expireDate',
      (expiresIn + Math.floor(Date.now() / 1000)).toString(),
    );
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
    }
  }
};

const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expireDate');

  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('expireDate');
};

export { saveTokens, clearTokens };
