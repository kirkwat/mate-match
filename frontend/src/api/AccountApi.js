import axios from "./axios";

export const handleLogin = (username, password) =>
  new Promise((resolve, reject) => {
    axios
      .post(`/session`, { email: username, password: password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });

export const registerAccount = (username, password) =>
  new Promise((resolve, reject) => {
    axios
      .post(`/register`, { email: username, password: password })
      .then((x) => resolve(x.data))
      .catch((x) => {
        alert(x);
        reject(x);
      });
  });