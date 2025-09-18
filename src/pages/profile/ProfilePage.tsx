import { useParams } from 'react-router-dom';
import './ProfilePage.css';

type ProfilePageParams = {
    userID: string;
}

const ProfilePage = () => {
    const { userID } = useParams<ProfilePageParams>();

    return (
        <div>
            <p>Profile</p>
            <p>User ID: {userID}</p>
        </div>
    );
}

export default ProfilePage;
