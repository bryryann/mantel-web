import axios from 'axios';
import { FriendRequest } from '@/types';
import { PaginationMetadata } from '@/types/json';

interface FriendRequestsResponse {
    meta: PaginationMetadata;
    requests: FriendRequest[];
};

export type FriendshipStatus = 'none' | 'accepted' | 'blocked' | 'pending';

export type FetchQuery = 'sent' | 'received';

interface SentRequestResponse {
    message: string;
    created_at: Date;
    status: FriendshipStatus;
};

export const fetchFriendRequests = async (token: string, queryParam: FetchQuery): Promise<FriendRequest[]> => {
    const query = `/api/friend-requests?by=${queryParam}`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.get<FriendRequestsResponse>(query, requestConfig);

    return res.data.requests;
}

/*
export const acceptFriendRequest = async (token: string, requestID: string): Promise<any> => {
    const query = `/api/friend-requests/${requestID}`;
    const requestBody = { status: 'accepted' };
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.patch(query, requestBody, requestConfig);

    console.log(res);
}
*/

export const getFriendshipStatus = async (userID: string, friendID: string): Promise<FriendshipStatus> => {
    const query = `/api/users/${userID}/friends/${friendID}`;

    const res = await axios.get<{ friendship_status: FriendshipStatus }>(query);

    return res.data.friendship_status;
}

export const sendFriendRequest = async (token: string, receiverID: string): Promise<SentRequestResponse> => {
    const requestBody = {
        receiver_id: parseInt(receiverID),
    };
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.post<SentRequestResponse>('/api/friend-requests', requestBody, requestConfig);

    return res.data;
}
