import axios from 'axios';
import { User } from '@/types/auth';
import { UserMetadata } from './userServices';

const API_URL = import.meta.env.VITE_API_URL;

export interface UserPublic extends User {
    data: UserMetadata;
};

interface SearchUsersResponse {
    meta: {
        page: number;
        page_size: number;
    };
    users: UserPublic[];
};

export const searchUsers = async (
    query: string,
    page: number = 1,
    pageSize: number = 15
): Promise<SearchUsersResponse> => {
    const requestUrl = `${API_URL}/users?q=${query}&page_size=${pageSize}&page=${page}`;

    const res = await axios.get<SearchUsersResponse>(requestUrl);

    return res.data;
}
