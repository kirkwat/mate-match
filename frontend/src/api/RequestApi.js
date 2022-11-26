import axios from './Endpoint';

export const getRequestsForUser = (auth) => new Promise((resolve, reject) => {
    axios.get(`/request/?to=${auth.username}`,{ headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const sendRequest = (request, auth) => new Promise((resolve, reject) => {
    axios.post(`/request`, request, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const deleteRequest = (request, auth) => new Promise((resolve, reject) => {
    axios.delete(`/request`, request, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const addRoommate = (users, auth) => new Promise((resolve, reject) => {
    axios.post(`/roommate`, users, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getRoommates = (email, auth) => new Promise((resolve, reject) => {
    axios.get(`/roommate?email=${email}`, { headers: {  authorization: `token: ${auth.accessToken}` } })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});