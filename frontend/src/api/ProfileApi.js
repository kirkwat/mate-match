import axios from 'axios';
import { Profile } from '../models/profile';

const baseURL = "http://localhost:3000";

export const getProfiles = () => new Promise((resolve, reject) => {
    axios.get(`${baseURL}/user`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getProfileByUsername = (user) => new Promise((resolve, reject) => {
    axios.get(`${baseURL}/user?email=${user}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const Health = () => new Promise((resolve, reject) => {
    axios.get(`${baseURL}/user`)
        .then(x => { resolve(x.data) })
        .catch(x => {
            alert(x);
            reject(x);
        });
});


export const createProfile = (profile) => new Promise((resolve, reject) => {
    axios.post(`${baseURL}/profiles/${profile.id}`, profile)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const updateProfile = (profile) => new Promise((resolve, reject) => {
    axios.put(`${baseURL}/profiles/${profile.id}`, profile)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});







