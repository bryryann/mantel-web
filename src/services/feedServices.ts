import axios from 'axios';
import { PaginationMetadata } from '@/types/json';
import { Post } from '@/types/posts';

export interface FeedResponse {
    feed: Post[];
    meta: PaginationMetadata;
};

export const getFeed = async (
    token: string,
    page: number = 1,
    pageSize: number = 20,
): Promise<FeedResponse> => {
    const query = `/api/feed?page=${page}&page_size=${pageSize}`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.get<FeedResponse>(query, requestConfig);

    return res.data;
}
