import axios from 'axios';
import { FriendRequest } from '@/types';
import { PaginationMetadata } from '@/types/json';
import { User } from '@/types/auth';

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

export const countReceivedRequests = async (token: string): Promise<number> => {
    const query = `/api/friend-requests?by=received`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.get<FriendRequestsResponse>(query, requestConfig);

    return res.data.requests ? res.data.requests.length : 0;
}

export const unfriend = async (token: string, requestID: string): Promise<number> => {
    const query = `/api/friend-requests/${requestID}/unfriend`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.delete<{ status: number }>(query, requestConfig);

    return res.data.status;
}

export const rejectFriendRequest = async (token: string, requestID: string): Promise<number> => {
    const query = `/api/friend-requests/${requestID}/reject`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.delete<{ status: number }>(query, requestConfig)

    return res.data.status;
}

export const cancelFriendRequest = async (token: string, requestID: string): Promise<number> => {
    const query = `/api/friend-requests/${requestID}/cancel`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.delete<{ status: number }>(query, requestConfig)

    return res.data.status;
}

export const acceptFriendRequest = async (token: string, requestID: string): Promise<FriendRequest> => {
    const query = `/api/friend-requests/${requestID}`;
    const requestBody = { status: 'accepted' };
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.put<{ friendship: FriendRequest }>(query, requestBody, requestConfig);

    return res.data.friendship;
}

export const getFriendshipStatus = async (userID: string, friendID: string): Promise<FriendshipStatus> => {
    const query = `/api/users/${userID}/friends/${friendID}/status`;

    const res = await axios.get<{ friendship_status: FriendshipStatus }>(query);

    return res.data.friendship_status;
}

export const getFriendship = async (userID: string, friendID: string): Promise<FriendRequest> => {
    const query = `/api/users/${userID}/friends/${friendID}`;

    const res = await axios.get<{ friendship: FriendRequest }>(query);

    return res.data.friendship;
}

export const listFriends = async (userID: string): Promise<User[]> => {
    const requestURL = `/api/users/${userID}/friends`;
    const res = await axios.get<{ friends: User[] }>(requestURL);

    return res.data.friends;
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
