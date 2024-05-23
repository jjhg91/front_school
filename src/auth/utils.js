// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  // const currentTime = Date.now() / 1000;
  // return decoded.exp > currentTime;

  const expTime = new Date(decoded.exp*1000);
  const currenTIme = new Date();
  return expTime > currenTIme;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  // const currentTime = Date.now();
  const currentTime = new Date();
  const expTime = new Date(exp*1000);

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  // const timeLeft = exp * 1000 - currentTime;
  const timeLeft = expTime - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert(`Token expired: ${exp} - ${expTime} - ${currentTime} - ${timeLeft}`);

   localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};

export const getUserToken = (accessToken) => {
  const { id_user } = jwtDecode(accessToken);

  return id_user;
}