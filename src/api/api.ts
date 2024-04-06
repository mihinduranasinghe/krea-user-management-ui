import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('REACT_APP_API_BASE_URL environment variable is not defined.');
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getUsers = async () => {
  return axiosInstance.get(`${API_BASE_URL}`);
};

export const getUserById = async (id: number) => {
  return axiosInstance.get(`${API_BASE_URL}/${id}`);
};

export const addUser = async (userData: any) => {
  return axiosInstance.post(API_BASE_URL, userData);
};

export const updateUser = async (id: number, userData: any) => {
  return axiosInstance.put(`${API_BASE_URL}/${id}`, userData);
};

export const deleteUser = async (id: number) => {
  return axiosInstance.delete(`${API_BASE_URL}/${id}`);
};

export const loginUser = async (loginData: { email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/login`, loginData);
};

export const registerUser = async (registerData: any) => {
  return axios.post(`${API_BASE_URL}/register`, registerData);
};
