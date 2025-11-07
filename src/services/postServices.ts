import { Post } from '@/types/posts';
import axios from 'axios';

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
    page: number = 1,
    pageSize: number = 10,
): Promise<PostsResponse> => {
    const requestUrl = `/api/users/${userID}/posts?page=${page}&page_size=${pageSize}`;

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
        '/api/posts',
        requestBody,
        requestConfig
    );
    console.log(res.data);

    return res.data
}

