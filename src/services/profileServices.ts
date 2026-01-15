import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const updateBio = async (token: string, content: string): Promise<number> => {
    const requestURL = `${API_URL}/profile/bio`;
    const requestBody = { content };
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const res = await axios.patch<void>(requestURL, requestBody, requestConfig);

    return res.status;
}
