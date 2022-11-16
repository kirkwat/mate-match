import axios from 'axios';

export const getRequests = (profileId) => new Promise((resolve, reject) => {
    axios.get(`/profiles/${profileId}/requests`)
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



