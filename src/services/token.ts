const TOKEN_KEY_NAME = 'six-cities-token';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY_NAME);
  return token ?? '';
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const dropToken = () => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};
