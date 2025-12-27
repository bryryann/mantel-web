import axios from 'axios';
import { User } from '@/types/auth';
import { UserMetadata } from './userServices';

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
    pageSize: number = 20
): Promise<SearchUsersResponse> => {
    const requestUrl = `/api/users?q=${query}&page_size=${pageSize}&page=${page}`;

    const res = await axios.get<SearchUsersResponse>(requestUrl);

    return res.data;
}
