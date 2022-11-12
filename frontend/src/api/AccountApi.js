import axios from './Endpoint';

export const createAccount = (username, password) => new Promise((resolve, reject) => {
    axios.post('/register', {username, password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const loginAccount = (username, password) => new Promise((resolve, reject) => {
    axios.post('/login', {username, password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});