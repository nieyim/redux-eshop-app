import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const axiosLoginClient = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosLoginClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosLoginClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosLoginClient;
