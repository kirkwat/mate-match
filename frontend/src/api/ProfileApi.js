import axios from './Endpoint';

export const getProfiles = () => new Promise((resolve, reject) => {
    axios.get(`/profiles`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getProfileById = (profileId) => new Promise((resolve, reject) => {
    axios.get(`/profiles/${profileId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const Health = () => new Promise((resolve, reject) => {
    axios.get(`/health`)
        .then(x => { resolve(x.data) })
        .catch(x => {
            alert(x);
            reject(x);
        });
});