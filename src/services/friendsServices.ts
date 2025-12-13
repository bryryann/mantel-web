import axios from 'axios';
import { FriendRequest } from '@/types';
import { PaginationMetadata } from '@/types/json';

interface FriendRequestsResponse {
    meta: PaginationMetadata;
    requests: FriendRequest[];
};

export type FriendshipStatus = 'none' | 'accepted' | 'blocked' | 'pending';

export const fetchFriendRequests = async (token: string): Promise<FriendRequest[]> => {
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.get<FriendRequestsResponse>(
        '/api/friend-requests', requestConfig
    );

    return res.data.requests;
}

export const getFriendshipStatus = async (userID: string, friendID: string): Promise<FriendshipStatus> => {
    const query = `/api/users/${userID}/friends/${friendID}`;

    const res = await axios.get<FriendshipStatus>(query);

    return res.data;
}
