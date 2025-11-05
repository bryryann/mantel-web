import axios from 'axios';

interface NewPostResponse {
    user_id: string;
    content: string;
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

