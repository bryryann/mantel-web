import axios from 'axios';

interface UserResponse {
    user: {
        id: string;
        username: string;
    }
};

export const fetchUser = async (userID: string): Promise<UserResponse> => {
    const res: { data: UserResponse } = await axios.get(`/api/users/${userID}`);

    return res.data;
}
