import './UserCard.css';

interface UserCardParams {
    id: string;
    username: string;
    followers: number;
    following: number;
    friends: number;
};

const UserCard: React.FC<UserCardParams> = ({
    id,
    username,
    followers,
    following,
    friends
}) => {
    return <p>{username}</p>
};

export default UserCard;
