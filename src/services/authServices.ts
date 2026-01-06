import axios from 'axios';
import { User } from '@/types/auth';

const API_URL = import.meta.env.VITE_API_URL;

interface LoginResponse {
    user: User;
    access_token: string;
};

export const loginUser = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
    const res = await axios.post(`${API_URL}/tokens/authentication`, credentials);
    return res.data as LoginResponse;
};

export const registerUser = async (userData: {
    username: string;
    email?: string;
    password: string;
}): Promise<User> => {
    const res: { data: LoginResponse } = await axios.post(`${API_URL}/users`, userData);

    return res.data.user;
};

