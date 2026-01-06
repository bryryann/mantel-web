import { Post } from '@/types/posts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface Meta {
    page: number;
    page_size: number;
}

interface NewPostResponse {
    user_id: string;
    content: string;
}

interface PostsResponse {
    meta: Meta;
    posts: Post[];
}

export const fetchPostsFromUser = async (
    userID: string,
    sort: 'newest' | 'oldest',
    pageSize: number = 10,
    page: number = 1,
): Promise<PostsResponse> => {
    const requestUrl = `${API_URL}/users/${userID}/posts?page=${page}&page_size=${pageSize}&sort=${sort}`;

    const res = await axios.get<PostsResponse>(requestUrl);

    return res.data;
}

export const newPost = async (token: string, content: string): Promise<NewPostResponse> => {
    const requestBody = { content };
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.post<NewPostResponse>(
        `${API_URL}/posts`,
        requestBody,
        requestConfig
    );

    return res.data
}
