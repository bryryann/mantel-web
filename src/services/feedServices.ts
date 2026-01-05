import axios from 'axios';
import { PaginationMetadata } from '@/types/json';
import { Post } from '@/types/posts';

const API_URL = import.meta.env.VITE_API_URL;

export interface FeedResponse {
    feed: Post[];
    meta: PaginationMetadata;
};

export const getFeed = async (
    token: string,
    page: number = 1,
    pageSize: number = 20,
): Promise<FeedResponse> => {
    const query = `${API_URL}/v1/feed?page=${page}&page_size=${pageSize}`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.get<FeedResponse>(query, requestConfig);

    return res.data;
}
