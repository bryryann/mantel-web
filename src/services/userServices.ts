import { User } from '@/types';
import axios from 'axios';

interface UserResponse {
    user: User;
};

interface FollowResponse {
    follower_id: string;
    followee_id: string;
}

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

export const followUser = async (token: string, userID: string, followeeID: string): Promise<FollowResponse> => {
    const requestURL = `/api/users/${userID}/follow`;
    const requestBody = {
        followee_id: followeeID,
    };
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.post<FollowResponse>(requestURL, requestBody, requestConfig);
    return res.data;
}
