import axios from "axios";
//update api endpoint and config
const apiEndPoint = "ENTERLINK";
const apiConfig = {
    headers: {
        Authorization: 'kwatson'
    }
};

export const getProfileById = (profileId) => new Promise((resolve, reject) => {
    axios.get(`${apiEndPoint}/${profileId}`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});