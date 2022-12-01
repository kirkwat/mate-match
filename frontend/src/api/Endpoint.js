import axios from 'axios';

// ENTER YOUR EC2 PUBLIC IP/URL HERE
const ec2_url = 'http://ec2-54-145-251-254.compute-1.amazonaws.com:8000';

export default axios.create({
    // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
    baseURL: ec2_url ? ec2_url : 'http://localhost:8000'
});