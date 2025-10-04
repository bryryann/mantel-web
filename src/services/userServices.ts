import { User } from '@/types';
import axios from 'axios';

interface UserResponse {
    user: User;
};

type FollowType = 'followees' | 'followers';

export const fetchUser = async (userID: string): Promise<UserResponse> => {
    const res: { data: UserResponse } = await axios.get(`/api/users/${userID}`);

    return res.data;
};

export const fetchFollowData = async (userID: string, type: FollowType): Promise<User[]> => {
    const requestURL = `/api/users/${userID}/${type}`;
    const res = await axios.get<Record<FollowType, User[]>>(requestURL);

    return res.data[type];
};
