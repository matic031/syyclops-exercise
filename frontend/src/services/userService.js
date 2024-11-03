import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const fetchUsers = async (limit = 20) => {
    const response = await axios.get(`${apiUrl}/users?limit=${limit}`);
    return response.data;
};

export const searchUsers = async (query) => {
    const response = await axios.get(`${apiUrl}/users/search`, {
        params: { query },
    });
    return response.data;
};

export const fetchUserById = async (userId) => {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axios.put(`${apiUrl}/users/${userId}`, userData);
    return response.data;
};
