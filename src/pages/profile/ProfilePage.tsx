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
    const [error, setError] = useState<string | null>(null);
    const { userID } = useParams<ProfilePageParams>();

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                setError(null);
                const data = await fetchUser(id);
                setUser(data.user);
            } catch (err: any) {
                console.log(err);
                setError(err.message || "An unknown error has occurred.");
                setUser(null);
            }
        };

        fetchData(userID);
    }, [userID]);

    if (error) return <div>Error: {error}</div>
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <p>{user.username}'s profile</p>
            <p>User ID: {userID}</p>
        </div>
    );
};

export default ProfilePage;
