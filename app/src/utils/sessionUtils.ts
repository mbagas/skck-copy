export const getToken = () => localStorage.getItem('access_token');

const SessionUtils = {
  getToken,
};

export default SessionUtils;
