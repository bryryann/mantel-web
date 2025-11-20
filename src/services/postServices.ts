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
    sort: string = 'newest'
): Promise<PostsResponse> => {
    const requestUrl = `/api/users/${userID}/posts?page=${page}&page_size=${pageSize}&sort=${sort}`;

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

export const countLikes = async (postID: number): Promise<number> => {
    const res = await axios.get<{ likes_count: number }>(`/api/posts/${postID}/likes/count`);

    return res.data.likes_count;
}

export const hasUserLikedPost = async (userID: string, postID: number): Promise<boolean> => {
    const query = `/api/users/${userID}/liked/${postID}`;
    const res = await axios.get<{ has_liked: boolean }>(query);

    return res.data.has_liked;
}
