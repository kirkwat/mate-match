import axios from 'axios';
import { Profile } from '../models/profile';

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


export const createProfile = (profile) => new Promise((resolve, reject) => {
    axios.post(`/profiles/${profile.id}`, profile)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const updateProfile = (profile) => new Promise((resolve, reject) => {
    axios.put(`/profiles/${profile.id}`, profile)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});







