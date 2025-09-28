import axios from 'axios';
import { User } from '@/types/auth';

interface UserResponse {
    id: string;
    username: string;
};

export const fetchUser = async (userID: string): Promise<UserResponse> => {
    const res = await axios.get(`/api/users/${userID}`);

    return res.data;
}
