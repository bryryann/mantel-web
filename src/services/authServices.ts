import axios from 'axios';
import { User } from '@/types/auth';

interface LoginResponse {
    user: User;
    access_token: string;
};

export const loginUser = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
    const res = await axios.post('/api/tokens/authentication', credentials);
    return res.data as LoginResponse;
};

export const registerUser = async (userData: {
    username: string;
    email?: string;
    password: string;
}): Promise<User> => {
    const res: { data: LoginResponse } = await axios.post('/api/users', userData);

    return res.data.user;
};

