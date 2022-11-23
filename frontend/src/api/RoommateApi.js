import axios from './Endpoint';

export const getRequests = (auth) => new Promise((resolve, reject) => {
    axios.get(`/request/?to=${auth.username}`,{ headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const setRequests = (profileId, requests) => new Promise((resolve, reject) => {
    axios.put(`/profiles/${profileId}/requests`, requests)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});