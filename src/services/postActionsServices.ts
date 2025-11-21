import axios from 'axios';

export interface LikeData {
    id: number;
    user_id: number;
    post_id: number;
    created_at: Date;
};

interface LikePostResponse {
    like: LikeData | null;
    message: string | null;
}

export const countLikes = async (postID: number): Promise<number> => {
    const res = await axios.get<{ likes_count: number }>(`/api/posts/${postID}/likes/count`);

    return res.data.likes_count;
}

export const likePost = async (token: string, postID: number): Promise<LikePostResponse> => {
    const query = `/api/posts/${postID}/likes`;
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await axios.post<LikePostResponse>(query, null, requestConfig);

    return res.data;
}

export const hasUserLikedPost = async (userID: string, postID: number): Promise<boolean> => {
    const query = `/api/users/${userID}/liked/${postID}`;
    const res = await axios.get<{ has_liked: boolean }>(query);

    return res.data.has_liked;
}
