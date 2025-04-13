import axios from "axios";

const BASE_URL = "http://localhost:5015/api/v1";

//Creates a new Axios instance with its own configuration.
const axiosInstance= axios.create();

axiosInstance.defaults.baseURL= BASE_URL;
axiosInstance.defaults.withCredentials= true;

export default axiosInstance;