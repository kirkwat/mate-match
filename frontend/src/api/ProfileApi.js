import axios from './Endpoint';

const apiConfig = {
    headers: {
        authorization: `token: ${sessionStorage.token}`
    }
};

export const getProfiles = () => new Promise((resolve, reject) => {
    axios.get(`/user`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getProfileByUsername = (user) => new Promise((resolve, reject) => {
    axios.get(`/user?email=${user}`, apiConfig)
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

export const updateProfile = (profile) => new Promise((resolve, reject) => {
    axios.put(`/user?email=${profile.email}`, profile, apiConfig)
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