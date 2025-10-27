import { User } from '@/types/auth';
import axios from 'axios';

interface UserResponse {
    user: User;
};

interface FollowResponse {
    follower_id: string;
    followee_id: string;
}

interface IsFollowingResponse {
    is_following: boolean;
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

export const isFollowing = async (userID: string, followeeID: string): Promise<IsFollowingResponse> => {
    const requestURL = `/api/users/${userID}/follows/${followeeID}`;

    const res = await axios.get<IsFollowingResponse>(requestURL);

    return res.data;
}

export const followUser = async (token: string, userID: string, followeeID: string): Promise<FollowResponse> => {
    const requestBody = {
        followee_id: parseInt(followeeID),
    };
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.post<FollowResponse>(
        `/api/users/${userID}/follow`,
        requestBody,
        requestConfig
    );
    console.log(res.data);
    return res.data;
}
