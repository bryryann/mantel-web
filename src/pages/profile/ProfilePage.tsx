import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '@/services/userServices';
import { User } from '@/types/auth';
import './ProfilePage.css';

type ProfilePageParams = {
    userID: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const { userID } = useParams<ProfilePageParams>();

    useEffect(() => {
        const fetchData = async (id: string) => {
            const data = await fetchUser(id);
            setUser(data.user);
        }

        fetchData(userID);
    }, [userID]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <p>{user.username}'s profile</p>
            <p>User ID: {userID}</p>
        </div>
    );
};

export default ProfilePage;
