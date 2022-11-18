import axios from './Endpoint';

export const createAccount = (username, pass) => new Promise((resolve, reject) => {
    axios.post('/register', {"email": username, "password": pass})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const loginAccount = (username, password) => new Promise((resolve, reject) => {
    axios.get(`/user?email=${username}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});


export const getAccounts = () => new Promise((resolve, reject) => {
    axios.get('/user')
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});




