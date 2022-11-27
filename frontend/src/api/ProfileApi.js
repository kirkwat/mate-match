import axios from './Endpoint';

const apiConfig = {
    headers: {
        authorization: `token: ${sessionStorage.token}`
    }
};

export const getProfiles = (auth) => new Promise((resolve, reject) => {
    axios.get(`/user`, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getProfileByUsername = (auth) => new Promise((resolve, reject) => {
    axios.get(`/user?email=${auth.username}`, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});
//TODO delete after figuring out how to not need auth for every request
export const getProfileByUsername2 = (email,auth) => new Promise((resolve, reject) => {
    axios.get(`/user?email=${email}`, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const Health = () => new Promise((resolve, reject) => {
    axios.get(`/user`, apiConfig)
        .then(x => { resolve(x.data) })
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const createProfile = (username, password) => new Promise((resolve, reject) => {
    axios.post(`/register`, {"email": username, "password": password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const updateProfile = (profile, auth) => new Promise((resolve, reject) => {
    axios.put(`/user`, profile, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const updatePreferences = (preferences, auth) => new Promise((resolve, reject) => {
    axios.put(`/user/preferences`, preferences, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const LoginCheck = (username, password) => new Promise((resolve, reject) => {
    axios.post(`/session`, {"email": username, "password": password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});