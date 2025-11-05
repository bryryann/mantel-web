import { User } from '@/types/auth';
import axios from 'axios';

export interface UserMetadata {
    follow_data: {
        followers_count: number;
        following_count: number;
    }
}

export type UserProfile = User & UserMetadata;

interface FetchUserResponse {
    user: UserProfile;
};

interface FollowResponse {
    follower_id: string;
    followee_id: string;
}

interface IsFollowingResponse {
    is_following: boolean;
}

type FollowType = 'followees' | 'followers';

export const fetchUser = async (userID: string): Promise<FetchUserResponse> => {
    const res: { data: FetchUserResponse } = await axios.get(`/api/users/${userID}`);

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
    return res.data;
}

export const unfollowUser = async (token: string, userID: string, followeeID: string): Promise<void> => {
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    await axios.post(`/api/users/${userID}/unfollow/${followeeID}`, null, requestConfig);
}
