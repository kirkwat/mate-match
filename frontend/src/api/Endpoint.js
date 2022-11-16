import axios from 'axios';

// ENTER YOUR EC2 PUBLIC IP/URL HERE
const ec2_url = '';

export default axios.create({
    // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
    baseURL: ec2_url ? ec2_url : 'http://localhost:3000'
});