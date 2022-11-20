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


export const createProfile = (username, password) => new Promise((resolve, reject) => {
    axios.post(`${baseURL}/register`, {"email": username, "password": password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const updateProfile = (profile) => new Promise((resolve, reject) => {
    axios.put(`${baseURL}/user?email=${profile.email}`, profile)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const LoginCheck = (username, password) => new Promise((resolve, reject) => {
    axios.post(`${baseURL}/session`, {"email": username, "password": password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});







