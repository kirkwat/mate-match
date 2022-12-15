import axios from "axios";

// ENTER EC2 PUBLIC IP/URL HERE
const ec2_url = "";

export default axios.create({
  baseURL: ec2_url ? ec2_url : "http://localhost:8000",
});

export const axiosPrivate = axios.create({
  baseURL: ec2_url ? ec2_url : "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
